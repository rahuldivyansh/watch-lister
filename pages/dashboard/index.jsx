import Dashboard from "@/src/components/dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  return <Dashboard />;
}
