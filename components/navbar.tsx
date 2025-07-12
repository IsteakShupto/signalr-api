/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm block md:flex">
        <div className="flex-none">
          <span className="btn btn-ghost text-xl">
            <Link href={"/"}>SignalR / API</Link>
          </span>
        </div>
        <ul className="bg-base-100 rounded-t-none p-2 flex gap-5">
          <li>
            <Link href={"/"}>
              <span className="btn btn-neutral text-white">
                Task: Location sharing{" "}
                <img
                  src="/assets/click.gif"
                  alt="click animation"
                  width={40}
                  className="rounded-full p-1"
                />
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/user-feed"}>
              <span className="btn btn-accent text-white">
                Task: User feed{" "}
                <img
                  src="/assets/click.gif"
                  alt="click animation"
                  width={40}
                  className="rounded-full p-1"
                />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
