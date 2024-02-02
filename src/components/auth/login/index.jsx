"use client";
import Link from "next/link";
import react, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 ">
        <h1 className="text-xl font-bold my-4">{`Enter your login details`}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            {`Login`}
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-2 rounded mt-2">
              {error}
            </div>
          )}
          <p className="text-sm mt-3 text-right">
            {`Don't have an account ?`}{" "}
            <Link href={"/register"} className="underline">
              {`Register here`}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
