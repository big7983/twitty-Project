"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center bg-white p-10 rounded-lg shadow-xl text-center">
        <Image
          src={session?.user?.image ?? "/avatar-user.jpg"}
          alt="User Profile"
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h1 className="text-xl font-bold mt-4">{session?.user?.name}</h1>
        <p className="text-gray-600">{session?.user?.email}</p>
      </div>
    </div>
  );
}
