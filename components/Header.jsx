"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row items-center gap-6 self-end">
      {session ? (
        <>
          Signed in
          {/* as {session.user.email} */}
          <br />
          <button
            onClick={() => signOut()}
            className="bg-purple-700 text-white rounded-md p-2"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button
            onClick={() => signIn()}
            className="bg-purple-700 text-white rounded-md p-2"
          >
            Sign in
          </button>
        </>
      )}
    </div>
    //   if (session) {
    //     return (

    //     );
    //   }
    //   return (
  );
}
