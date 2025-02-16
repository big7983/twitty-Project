"use client"
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Page() {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg  w-full px-5 py-8 sm:p-8 max-w-[395px] mx-5 sm:mx-0">
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-center text-2xl pt-4 pb-4 font-bold">Login To Twitty</div>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="text-base  w-full border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <Image
              className="mr-2"
              src="/google_logo.png"
              alt="Google Logo"
              width={18}
              height={18}
            />
            Sign in with Google
          </button>
          <button
            type="button"
            className="text-base w-full border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <Image
              className="mr-2"
              src="/Microsoft_icon.png"
              alt="Microsoft Logo"
              width={18}
              height={18}
            />
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}
