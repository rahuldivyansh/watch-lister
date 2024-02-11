import Link from "next/link";
import React from "react";
import RegisterPage from "@/src/components/auth/register";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Register() {
  // This code is used to redirect the user to the dashboard if they are already logged in.
  // This is used to prevent the user from being able to access the register page if they are already logged in.
  const router = useRouter();

  const session = useSession();
  if (session.status === "authenticated") {
    router.push("/dashboard");
    return null;
  }
  return <RegisterPage />;
}
