import { getToken } from "next-auth/jwt";
const withAuthApi = (handler) => async (req, res) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = session.email;
  return handler(req, res);
};

export default withAuthApi;