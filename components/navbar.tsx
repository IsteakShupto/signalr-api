"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <a className="btn btn-ghost text-xl">SignalR / API</a>
        </div>
        <ul className="bg-base-100 rounded-t-none p-2 flex gap-5">
          <li>
            <Link href={"/"}>
              <span className="underline underline-offset-2 decoration-indigo-500">
                Userfeed
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <span className="underline underline-offset-2 decoration-indigo-500">
                Location sharing
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
