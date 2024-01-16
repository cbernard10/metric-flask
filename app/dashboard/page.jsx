"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UserMetrics from "../../components/UserMetrics";

function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="flex flex-col mx-auto max-w-[1000px] py-16 gap-8">
          {/* <h1 className="text-3xl font-semibold pb-8">Dashboard</h1> */}
          <UserMetrics />
        </div>
      ) : (
        <div>
          <p>Access Denied</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;
