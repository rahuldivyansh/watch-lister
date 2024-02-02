'use client';
import react, {useState} from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        console.log("User registered successfully !!");
        form.reset();
        router.push("/login");
      } else {
        if (res.status == 514) {
          setError("Email already exists. Please register with a new email.");
        } else {
          setError("User registration failed");
        }
      }
    } catch (error) {
      setError("Error during registration.");
    }
  };

  return (
    <div className="register grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 ">
        <h1 className="text-xl font-bold my-4">Register Here</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-2 rounded mt-2">
              {error}
            </div>
          )}
          <p className="text-sm mt-3 text-right">
            Already have an account ?{" "}
            <Link href={"/login"} className="underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

