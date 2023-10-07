"use client";
import React, { use, useEffect, useState } from "react";
import dayjs from "dayjs";

import NextIcon from "@/app/svg-icons/NextIcon";
import PrevIcon from "@/app/svg-icons/PrevIcon";
import { months, generateDate } from "@/app/utils/calendar";

import axios from "axios";

import cn from "@/app/utils/cn";
import { useAppStore } from "@/app/store/AppStore";

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const user = useAppStore((state) => state.user);
  const [meetingsData, setMeetingsData] = useState([]);
  const [userMeets, setUserMeets] = useState([]);
  const [userPerMonthMeets, setUserPerMonthMeets] = useState([]);
  const [showDayMeets, setShowDayMeets] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const getMeets = async () => {
      // console.log(user.ethAddress)
      const { data } = await axios.patch("/api/meetings", {
        address: user.ethAddress,
      });
      console.log(data);
      setUserMeets(data.data);
      const dates = [];
      for (let i = 0; i < 12; i++) {
        dates.push([]);
      }
      const meetsMetaData = {};
      // console.log(userMeets)
      // const meetShow = []
      const processUserMeets = () => {
        data.data.forEach((meet) => {
          const strDate = meet.meetConfig.date;
          const date = new Date(strDate);
          if (!date || date === undefined || date === null) {
            return;
          }
          const month = date.getMonth();
          const day = date.getDate();
          const hash = day + "," + month;
          if (!meetsMetaData[hash]) {
            meetsMetaData[hash] = [];
          }
          meetsMetaData[hash].push(meet);
          dates[month].push(day);
        });
      };
      processUserMeets();
      setUserPerMonthMeets(dates);
      setMeetingsData(meetsMetaData);
      // console.log(meetsMetaData)
      // setShowDayMeets(meetShow)
    };
    getMeets();
    // console.log(meetingsData)
  }, []);

  const getMeetByDate = (date) => {
    console.log(date);
    const strDate = new Date(date);
    console.log(strDate.toDateString());
    const meet = meetingsData[strDate];
    if (!meet) {
      return null;
    }
    return meet.title;
  };

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
                console.log(`Month: ${today.month()}`);
              }}
            >
              <PrevIcon />
            </div>
            <div
              className="relative"
              onClick={() => {
                setToday(today.month(today.month() + 1));
                console.log(`Year: ${today.year()}`);
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
                      "relative border-[#5D8BF4C7] flex flex-col justify-end items-start p-2 gap-1"
                    )}
                  >
                    <div className="flex flex-col bg-card-color w-auto h-full gap-1 relative">
                      <div className="flex flex-col justify-start items-left w-auto">
                        {userPerMonthMeets[date.month()]?.includes(
                          date.date()
                        ) && (
                          <div className="px-2 py-[2px] relative w-full rounded-[5px] text-[10px] bg-[#EE2A2ACC]">
                            {
                              meetingsData[date.date() + "," + date.month()]
                                ?.length
                            }{" "}
                            meet(s)
                          </div>
                        )}
                      </div>
                      {showDayMeets[index] && (
                        <div className="overflow-y-scroll absolute z-10 flex flex-col items-left justify-start text-sm border-[2px] border-black bg-sky-blue rounded-[5px] gap-2 bg-red-500 px-2 py-2 w-48 h-auto">
                          {meetingsData[date.date() + "," + date.month()]?.map(
                            (meet, index) => {
                              return (
                                <div key={index} className="border-[1px] rounded-[10px] border-black text-black flex flex-col items-left justify-start text-sm  gap-3  px-2 py-[2px]">
                                  <div>{meet.title}</div>{" "}
                                  <div>{meet.description}</div>{" "}
                                  <a href={`${window?.location?.origin}/meeting/lobby/${meet?.roomId}`} className="truncate text-sec-blue cursor-pointer hover:text-light-blue">
                                    {window.location.origin}/meeting/lobby/{meet.roomId}
                                  </a>
                                </div>
                              );
                            }
                          )}
                          {/* <div className="absolute flex flex-col items-left justify-start text-[10px] border-[2px] border-black bg-light-blue rounded-[5px]  bg-red-500 px-2 py-[2px] w-48 h-">
                          Meeting Title
                        </div> */}
                        </div>
                      )}
                    </div>

                    <h1
                      className={cn(
                        currentMonth ? "text-black" : "text-[#ccc]",
                        today ? "bg-light-blue text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "absolute right-1 top-1 h-7 w-10 rounded-[5px] grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                        var shows = showDayMeets;
                        var curr = shows[index];
                        shows[index] = !curr;
                        setShowDayMeets(shows);
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
