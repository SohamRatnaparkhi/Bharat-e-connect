import React from "react";

import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from "@huddle01/react";
import "regenerator-runtime/runtime";
import { useMeetingStore } from "@/app/store/MeetingStore";

import { FiArrowDown } from "react-icons/fi";
import { SendMessage } from "@/app/svg-icons/MeetingOptions";
import cn from "@/app/utils/cn";

const ChatBox = ({ chatBox }) => {
  const { me } = useHuddle01();
  const [groupMessage, setGroupMessage] = React.useState("");
  const { sendData } = useAppUtils();
  const roomMessages = useMeetingStore((state) => state.roomMessages);
  const addRoomMessage = useMeetingStore((state) => state.addRoomMessage);

  const [privateMode, setPrivateMode] = React.useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if(groupMessage == "") return console.log("Empty message");

      sendData("*", {
        sender: me,
        message: groupMessage,
        kind: "group",
      });
      addRoomMessage({
        sender: me,
        message: groupMessage,
        kind: "group",
        receiver: "*",
      });
      console.log(
        "sent group message - ",
        groupMessage,
        " - to all peers"
      );
      setGroupMessage("");
    }
  }


  return (
    <div className={cn(chatBox ? "w-25%" : "0", "ease-in-out duration-300")}>
      {chatBox && (
        <div className="w-25% absolute flex flex-col items-center justify-center right-0 bottom-0 bg-white h-95% ease-in-out duration-300">
          <div className="relative flex flex-col items-center justify-between py-5 w-90% h-95% bg-[#5D8BF41C] rounded-[10px]">
            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white cursor-pointer">
              <div
                className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%"
                onClick={() => {
                  setPrivateMode(true);
                }}
              >
                Participants
              </div>
              <div
                className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%"
                onClick={() => {
                  setPrivateMode(false);
                }}
              >
                Groups
              </div>
            </div>

            <div className="flex flex-col overflow-y-scroll w-90% h-75%">
              {roomMessages.map((message, index) => {
                if (message.kind == "group")
                  return (
                    <div
                      className="w-70% flex flex-col bg-slate-400 p-2 my-2 rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-none"
                      key={index}
                    >
                      <div className="relative flex flex-row h-10%"> 
                        <div className="text-white text-sm font-semibold">
                          {message.sender.displayName.split(",")[0]}:
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {console.log(`TimeStamp: ${message.timeStamp}`) }
                          {message.timeStamp}
                        </div>
                      </div>
                      <div className="relative mt-3">{message.message}</div>
                    </div>
                  );
              })}
            </div>

            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white">
              <input
                type="text"
                placeholder="Type your message"
                onChange={(e) => setGroupMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                value={groupMessage}
                className="w-3/5 h-80% p-3 rounded-[5px] active:text-white"
              />
              <div className="w-1/6 h-80% flex items-center justify-center text-lg cursor-pointer hover:text-[#5D8BF4] active:bg-slate-300 rounded-full ease-in-out duration-300">
                <FiArrowDown />
              </div>
              <div
                className="flex items-center justify-center w-1/6 h-80% bg-[#5D8BF4] rounded-[5px] cursor-pointer active:h-70% ease-in-out duration-300"
                onClick={() => {

                  if(groupMessage == "") return console.log("Empty message");

                  sendData("*", {
                    sender: me,
                    message: groupMessage,
                    kind: "group",
                  });
                  addRoomMessage({
                    sender: me,
                    message: groupMessage,
                    kind: "group",
                    receiver: "*",
                  });
                  console.log(
                    "sent group message - ",
                    groupMessage,
                    " - to all peers"
                  );
                  setGroupMessage("");
                }}
              >
                <SendMessage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
