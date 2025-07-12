"use client";

import dynamic from "next/dynamic";

import UserA from "@/components/userA";
const UserB = dynamic(() => import("@/components/userB"), { ssr: false });

export default function LocationSharing() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          <div>
            <UserA />
          </div>
          <div className="w-full">
            <UserB />
          </div>
        </div>
      </div>
    </>
  );
}
