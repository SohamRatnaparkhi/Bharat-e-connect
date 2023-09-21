import React from "react";

import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from "@huddle01/react";
import "regenerator-runtime/runtime";
import { useMeetingStore } from "@/app/store/MeetingStore";

import { formatTime } from "../../(utils)/TIme";

import { FiArrowDown, FiArrowLeft } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { SendMessage } from "@/app/svg-icons/MeetingOptions";
import cn from "@/app/utils/cn";

const ChatBox = ({ chatBox, peers }) => {
  const { me } = useHuddle01();
  const [groupMessage, setGroupMessage] = React.useState("");
  const { sendData } = useAppUtils();
  const roomMessages = useMeetingStore((state) => state.roomMessages);
  const addRoomMessage = useMeetingStore((state) => state.addRoomMessage);

  const [privateMode, setPrivateMode] = React.useState(false);
  const [talkTo, setTalkTo] = React.useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (groupMessage == "") return console.log("Empty message");

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
        timeStamp: formatTime(new Date().getTime()),
      });
      console.log("sent group message - ", groupMessage, " - to all peers");
      setGroupMessage("");
    }
  };

  return (
    <div className={cn(chatBox ? "w-25%" : "0", "ease-in-out duration-300")}>
      {chatBox && (
        <div className="w-25% absolute flex flex-col items-center justify-center right-0 bottom-0 bg-white h-95% ease-in-out duration-300">
          <div className="relative flex flex-col items-center justify-between py-5 w-90% h-95% bg-[#5D8BF41C] rounded-[10px]">
            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white cursor-pointer">
              <div
                className={cn(
                  privateMode
                    ? "bg-[#5D8BF4] text-white h-80%"
                    : "bg-transparent",
                  "flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%"
                )}
                onClick={() => {
                  setPrivateMode(true);
                }}
              >
                Participants
              </div>
              <div
                className={cn(
                  !privateMode
                    ? "bg-[#5D8BF4] text-white h-80%"
                    : "bg-transparent",
                  "flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%"
                )}
                onClick={() => {
                  setPrivateMode(false);
                }}
              >
                Groups
              </div>
            </div>
            {console.log(`peers: ${JSON.stringify(peers)}`)}
            {console.log(`TalkTo: ${talkTo}`)}

            {/* contacts */}
            <div
              className={cn(
                privateMode && talkTo === "" ? "w-85% h-75%" : "w-0 h-0",
                "flex flex-col items-center overflow-y-scroll  bg-white rounded-[6px] ease-in-out duration-300 cursor-pointer"
              )}
            >
              {Object.values(peers).map((peer) => {
                return (
                  <div className="w-80% h-10% border-b-[1px] flex flex-row justify-between items-center">
                    <div
                      key={peer.peerId}
                      onClick={() => setTalkTo(peer.peerId)}
                      className="flex w-80% h-full justify-between items-center pt-1 p-2 text-[#808080] font-semibold  border-[#cccccc] active:bg-[#dddddd] rounded-[6px]"
                    >
                      <div>{peer.displayName?.split(",")?.[0]}</div>
                    </div>
                    <div className="rounded-full p-2 active:bg-[#eeeeee]">
                      <AiOutlineUsergroupAdd />{" "}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Individual messages */}
            <div
              className={cn(
                privateMode && talkTo !== "" ? "w-85% h-75%" : "w-0 h-0",
                "relative flex flex-col overflow-y-scroll ease-in-out duration-300 text-[#5D8BF4]"
              )}
            >
              <div
                onClick={() => {
                  setTalkTo("");
                }}
                className="absolute left-1 top-1 rounded-full bg-[#808080]"
              >
                <FiArrowLeft />
              </div>
              <div className="text-[#5D8BF4] text-center">
                {console.log(peers.peerId?.displayName?.split(",")?.[0])}
                {peers[talkTo]?.displayName?.split(",")?.[0]}
              </div>
            </div>

            {/* Group messages */}
            <div
              className={cn(
                !privateMode ? "w-85% h-75%" : "w-0 h-0",
                "flex flex-col overflow-y-scroll ease-in-out duration-300"
              )}
            >
              {roomMessages.map((message, index) => {
                if (message.kind == "group")
                  return (
                    <div
                      className={cn(
                        message.sender.displayName == me.displayName
                          ? "bg-[#5D8BF475] right-1 rounded-tr-none rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px]"
                          : "bg-slate-400 left-1 rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-none",
                        "w-95% flex flex-col p-2 my-2 "
                      )}
                      key={index}
                    >
                      {" "}
                      {console.log(
                        `me: ${me.displayName === message.sender.displayName}`
                      )}
                      <div className="relative flex flex-row justify-between h-10%">
                        <div className="text-white text-sm font-semibold">
                          {message.sender.displayName.split(",")[0]}:
                        </div>
                        <div className="text-[12px] font-semibold text-white">
                          {console.log(`TimeStamp: ${JSON.stringify(message)}`)}
                          {message?.timeStamp}
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
                  if (groupMessage == "") {
                    return console.log("Empty message");
                  }

                  sendData("*", {
                    sender: me,
                    message: groupMessage,
                    kind: "group",
                    timeStamp: formatTime(new Date().getTime()),
                  });
                  addRoomMessage({
                    sender: me,
                    message: groupMessage,
                    kind: "group",
                    receiver: "*",
                    timeStamp: formatTime(new Date().getTime()),
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
