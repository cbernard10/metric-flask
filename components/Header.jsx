/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div
      className="
    flex flex-row items-center gap-6 self-end bg-gradient-to-b 
    from-neutral-900 to-black w-full h-full p-6 border-b-2 border-b-neutral-950 justify-between"
    >
      {session ? (
        <>
          <div className="flex flex-row items-center gap-6">
            <img
              src={session.user.image}
              className="w-12 h-12 rounded-full"
              alt="user image"
            />
            {session.user.name}
          </div>
          <button
            onClick={() => signOut()}
            className="bg-black text-white rounded-md py-2 px-6 border-white border-2
            hover:border-purple-700"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn()}
            className="bg-black text-white rounded-md px-6 py-2 border-2 border-white
                hover:border-purple-700
            "
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}
