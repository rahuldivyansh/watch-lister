import React from "react";
import Link from "next/link";
import LoginPage from "@/src/components/auth/login";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Login() {
  // This code is used to redirect the user to the dashboard if they are already logged in.
  // This is used to prevent the user from being able to access the login page if they are already logged in.
  const router = useRouter();

  const session = useSession();
  if (session.status === "authenticated") {
    router.push("/");
    return null;
  }

  return <LoginPage />;
}
