import { connectMongoDB } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/src/models/user";

export default async function handler(req, res) {
  try {
    const { name, email, password } = await req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    // This can be used to check if the user already exists. It will return 500 error. But we can also make userExists.js in pages/api/auth function and call it to check if the user already exists. We will be passing the email as a parameter to that function from registerForm component, before calling this handler(pages/api/auth/register.js). Then it would result user and we would check that in registerForm component and setError as user already exists and return from registerForm component. But we can also do it here in three lines of code.
    if (await User.findOne({ email })) {
      return res.status(514).json({ message: "User already exists" });
    }

    await User.create({ name, email, password: hashedPassword });

    return res.status(200).json({ message: "Registration successfull" });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed in route" });
  }
}
