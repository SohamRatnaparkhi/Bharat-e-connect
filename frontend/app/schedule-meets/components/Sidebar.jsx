"use client";

import UserIcon from "@/app/svg-icons/UserIcon";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useScrollTrigger } from "@mui/material";

import cn from "@/app/utils/cn";
import { useAppStore } from "@/app/store/AppStore";

const Sidebar = () => {
  const { push } = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const setLogin = useAppStore((state) => state.setLogin);

  const [section, setSection] = useState("meeting");

  return (
    <div className="relative h-full w-1/5 flex flex-col justify-center cursor-pointer">
      <div className="relative bg-[#EDF2FE] w-11/12 h-5/6 flex flex-col justify-between rounded-r-[30px] ">
        <div className="relative h-3/5 flex flex-col justify-evenly items-center">
          <div
            onClick={() => {
                push('/schedule-meets')
              setSection("meeting");
            }}
            className={cn(
              section === "meeting"
                ? "text-white bg-[#5D8BF4]"
                : "text-black bg-transparent",
              "relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont   hover:px-3 ease-in-out duration-300 "
            )}
          >
            Meeting
          </div>
          {/* <div
            onClick={() => {
              setSection("meeting");
            }}
            className={cn(
              section === "meeting"
                ? "text-white bg-[#5D8BF4]"
                : "text-black bg-transparent",
              "relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont   hover:px-3 ease-in-out duration-300 "
            )}
          >
            Meeting
          </div> */}
          <div
            onClick={() => {
              setSection("phonebook");
              push("/phonebook/");
            }}
            className={cn(
              section === "phonebook"
                ? "text-white bg-[#5D8BF4]"
                : "text-black bg-transparent",
              "relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont   hover:px-3 ease-in-out duration-300 "
            )}
          >
            Phonebook
          </div>
          <div
            onClick={() => {
              setSection("Store");
              push("/e-store/");
            }}
            className={cn(
              section === "Store"
                ? "text-white bg-[#5D8BF4]"
                : "text-black bg-transparent",
              "relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont   hover:px-3 ease-in-out duration-300 "
            )}
          >
            Store
          </div>
          {/* <div
            onClick={() => {
              setSection("store");
            }}
            className={cn(
              section === "store"
                ? "text-white bg-[#5D8BF4]"
                : "text-black bg-transparent",
              "relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont   hover:px-3 ease-in-out duration-300 "
            )}
          >
            Files
          </div> */}
        </div>

        <div className="relative h-1/4 flex flex-row items-center justify-start ml-10 text-black"
        onClick={() => {
          setUser(null);
          setLogin(false);
          push("/login");
        }}>
          <UserIcon styles={{ width: "100px", height: "100px" }} />
          <div className="pl-3 font-mont text-xl">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
