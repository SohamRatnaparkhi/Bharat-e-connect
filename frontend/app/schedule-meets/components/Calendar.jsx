"use client";
import React, { use, useEffect, useState } from "react";
import dayjs from "dayjs";

import NextIcon from "@/app/svg-icons/NextIcon";
import PrevIcon from "@/app/svg-icons/PrevIcon";
import { months, generateDate } from "@/app/utils/calendar";
import { getMeeting } from "@/app/hooks/MeetApiCalls";

import axios from "axios";


import cn from "@/app/utils/cn";
import { useAppStore } from "@/app/store/AppStore";

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const user = useAppStore(state => state.user)

  useEffect(() => {
    const getMeets = async () => {
      console.log(user.ethAddress)
      const { data } = await axios.patch('/api/meetings', {
        "address": user.ethAddress
      })
      console.log(data);
    }

    getMeets();
  }, [])




  return (
    <div className="relative flex justify-end w-9/12 h-5/6">
      <div className=" flex flex-col justify-between items-center rounded-l-[30px] bg-white w-full border-4 border-sky-blue">
        <div className="flex flex-row justify-between items-center w-90% h-15% ">
          <div className="font-bold text-lg text-[#555] cursor-pointer">
            {months[today.month()]} {today.year()}
          </div>
          <div className="flex flex-row w-10% items-center justify-around cursor-pointer">
            <div
              className="relative"
              onClick={() => {
                setToday(today.month(today.month() - 1));
                // console.log(`Month: ${today.month()}`);
              }}
            >
              <PrevIcon />
            </div>
            <div
              className="relative"
              onClick={() => {
                setToday(today.month(today.month() + 1));
                // console.log(`Year: ${today.year()}`);
              }}
            >
              <NextIcon />
            </div>
          </div>
        </div>

        <div className="relative bottom-11 w-90% h-80% ">
          {/* weekdays */}
          <div className="grid grid-cols-7 w-full h-10% ">
            {days.map((day, index) => (
              <div
                key={index}
                className={cn(
                  day === "Sun" ? "text-[#EE2A2ACC]" : "text-light-blue",
                  "flex justify-end items-center  font-normal p-3"
                )}
              >
                {" "}
                {day}
              </div>
            ))}
          </div>

          {/* dates */}
          <div className="grid grid-cols-7 w-full h-95% border-[1px] border-light-blue rounded-[12px]">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      index === 0
                        ? "border-[1px] rounded-tl-[12px]"
                        : index === 6
                        ? "border-[1px] rounded-tr-[12px]"
                        : index === 35
                        ? "border-[1px] rounded-bl-[12px]"
                        : index === 41
                        ? "border-[1px] rounded-br-[12px]"
                        : "border-[1px]",
                      " border-[#5D8BF4C7] flex flex-row justify-end items-start p-2 "
                    )}
                  >
                    <h1
                      className={cn(
                        currentMonth ? "text-black" : "text-[#ccc]",
                        today ? "bg-light-blue text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-7 w-10 rounded-[5px] grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
