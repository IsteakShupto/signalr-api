"use client";

import dynamic from "next/dynamic";

import UserA from "@/components/userA";
const UserB = dynamic(() => import("@/components/userB"), { ssr: false });

export default function LocationSharing() {
  return (
    <>
      <div className="flex flex-row">
        <UserA />
        <UserB />
      </div>
    </>
  );
}
