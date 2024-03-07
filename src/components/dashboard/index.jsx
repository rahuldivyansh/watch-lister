"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6 ">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 w-full"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Log Out
        </button>
        <Link href={"/"}>
          <button className="bg-green-500 text-white font-bold px-6 py-2 mt-3 w-full">
            Go to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
