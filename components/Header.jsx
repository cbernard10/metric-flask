/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div
      className="
    flex flex-row items-center gap-6 self-end bg-gradient-to-b 
    from-neutral-900 to-black w-full h-full px-6 py-6 border-b-2 border-b-neutral-950 justify-end"
    >
      {session ? (
        <>
          <div className="flex flex-row items-center gap-6 justify-between md:justify-center w-full relative py-2">
            <div className="flex flex-row gap-6 text-sm sm:text-base">
              <Link
                href="/"
                className="hover:text-violet-400 border-b-2 border-transparent hover:border-violet-400"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-violet-400 border-b-2 border-transparent hover:border-violet-400"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex flex-row items-center gap-6 absolute right-0 ">
              <span className="hidden sm:block">{session.user.name}</span>
              <img
                src={session.user.image}
                className="w-12 h-12 rounded-full"
                alt="user image"
              />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-black text-white rounded-md py-2 px-6 border-white border-2
                hover:border-violet-700"
              >
                Sign out
              </button>
              
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-black text-white rounded-md px-6 py-2 border-2 border-white
                hover:border-violet-700
            "
        >
          Sign in
        </button>
      )}
    </div>
  );
}
