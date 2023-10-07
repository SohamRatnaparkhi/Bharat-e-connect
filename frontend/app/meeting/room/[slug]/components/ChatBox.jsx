import React, { useState } from "react";

import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from "@huddle01/react";
import "regenerator-runtime/runtime";
import { useMeetingStore } from "@/app/store/MeetingStore";

import { formatTime } from "../../(utils)/TIme";

import { FiArrowDown, FiArrowLeft } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FcFile } from "react-icons/fc";
import { BsShieldLock, BsShieldLockFill } from "react-icons/bs";

import { SendMessage } from "@/app/svg-icons/MeetingOptions";
import cn from "@/app/utils/cn";
import { getjwt } from "../utils/info";
import axios from "axios";

const ChatBox = ({ chatBox, peers }) => {
  const { me } = useHuddle01();
  const [groupMessage, setGroupMessage] = React.useState("");
  const { sendData } = useAppUtils();
  const roomMessages = useMeetingStore((state) => state.roomMessages);
  const addRoomMessage = useMeetingStore((state) => state.addRoomMessage);
  const addPeerToRole = useMeetingStore((state) => state.addPeerToRole);
  const removePeerFromRole = useMeetingStore(
    (state) => state.removePeerFromRole
  );
  const roomPeerRoles = useMeetingStore((state) => state.roomPeerRoles);
  const [privateMode, setPrivateMode] = React.useState(false);
  const [talkTo, setTalkTo] = React.useState("*");
  const [file, setFile] = useState();
  const [fileurl, setFileurl] = useState();
  const [filehash, setFileHash] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileurl(e.target.files[0]);
    uploadToIpfs(e.target.files[0]);
  }

  const uploadToIpfs = async (currFile) => {
    const formData = new FormData();
    formData.append("file", currFile);
    console.log(currFile);
    const metadata = JSON.stringify({
      name: currFile.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const JWT = `Bearer ${getjwt()}`;

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data);
      setFileHash(res.data.IpfsHash);
      sendData("*", {
        sender: me,
        message: "ipfs.io/ipfs/" + res.data.IpfsHash,
        kind: "group",
        receiver: "*",
        isLink: true,
        fileName: currFile.name,
        timeStamp: formatTime(new Date().getTime()),
      });
      addRoomMessage({
        sender: me,
        message: "ipfs.io/ipfs/" + res.data.IpfsHash,
        kind: "group",
        isLink: true,
        fileName: currFile.name,
        receiver: "*",
        timeStamp: formatTime(new Date().getTime()),
      });
      alert("Uploaded successfully");
    } catch (error) {
      console.log(error);
      // alert("There was an error. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (groupMessage == "") {
        return console.log("Empty message");
      }
      console.log("message", {
        sender: me,
        message: groupMessage,
        kind: talkTo == "*" ? "group" : "private",
        receiver: talkTo == "*" ? "*" : talkTo,
        timeStamp: formatTime(new Date().getTime()),
      });
      const peerIdsToSend = talkTo == "*" ? "*" : [talkTo];
      sendData(peerIdsToSend, {
        sender: me,
        message: groupMessage,
        kind: talkTo == "*" ? "group" : "private",
        receiver: talkTo == "*" ? "*" : talkTo,
        timeStamp: formatTime(new Date().getTime()),
      });
      addRoomMessage({
        sender: me,
        message: groupMessage,
        kind: talkTo == "*" ? "group" : "private",
        receiver: talkTo == "*" ? "*" : talkTo,
        timeStamp: formatTime(new Date().getTime()),
      });
      console.log(
        "sent group message - ",
        groupMessage,
        " - to ",
        peerIdsToSend
      );
      setGroupMessage("");
    }
  };

  console.log(roomMessages);

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
                  setTalkTo("*");
                }}
              >
                Groups
              </div>
            </div>
            {/* {console.log(`peers: ${JSON.stringify(peers)}`)} */}
            {console.log(`TalkTo: ${talkTo}`)}

            {/* contacts */}
            <div
              className={cn(
                privateMode && talkTo === "*" ? "w-85% h-75%" : "w-0 h-0",
                "flex flex-col items-center overflow-y-scroll  bg-white rounded-[6px] ease-in-out duration-300 cursor-pointer"
              )}
            >
              {Object.values(peers).map((peer) => {
                return (
                  <div className="w-80% h-10% flex flex-row justify-between items-center">
                    <div
                      key={peer.peerId}
                      onClick={() => setTalkTo(peer.peerId)}
                      className="flex border-b-[1px] w-80% h-full justify-between items-center pt-1 p-2 text-[#808080] font-semibold  border-[#cccccc] active:bg-[#dddddd] rounded-[6px]"
                    >
                      <div>{peer.displayName?.split(",")?.[0]}</div>
                      {console.log(
                        `Contacts: ${peer.displayName?.split(",")?.[0]}`
                      )}
                    </div>
                    <div
                      className="rounded-full p-2 active:bg-[#eeeeee]"
                      onClick={() => {
                        const role = prompt("Enter role name");
                        if (role) {
                          addPeerToRole(role, peer.peerId);
                        }
                      }}
                    >
                      <AiOutlineUsergroupAdd />{" "}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Individual messages */}
            <div
              className={cn(
                privateMode && talkTo !== "*" ? "w-85% h-75%" : "w-0 h-0",
                "relative flex flex-col overflow-y-scroll ease-in-out duration-300 text-[#5D8BF4]"
              )}
            >
              <div
                onClick={() => {
                  setTalkTo("*");
                }}
                className="absolute left-1 top-1 flex items-center justify-center rounded-full hover:bg-[#cccccc] w-[30px] h-[30px] cursor-pointer"
              >
                <FiArrowLeft />
              </div>
              <div className="text-[#5D8BF4] text-center">
                {console.log(peers.peerId?.displayName?.split(",")?.[0])}
                {peers[talkTo]?.displayName?.split(",")?.[0]}
                <div>
                  {roomMessages.filter(
                    (message) =>
                      message.sender?.meId == talkTo ||
                      message.receiver == talkTo ||
                      message.receivers?.includes(talkTo)
                  ).length > 0
                    ? roomMessages
                        .filter(
                          (message) =>
                            message.sender?.meId == talkTo ||
                            message.receiver == talkTo
                        )
                        .map((message, index) => {
                          if (message.kind == "private")
                            return (
                              <div
                                className={cn(
                                  message.sender.displayName === me.displayName
                                    ? "justify-end"
                                    : "justify-start",
                                  "flex flex-row items-center w-full h-auto"
                                )}
                              >
                                <div
                                  className={cn(
                                    message.sender.displayName == me.displayName
                                      ? "bg-[#5D8BF475] right-1 rounded-tr-none rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px]"
                                      : "bg-[#aacc] left-1 rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-none",
                                    "w-auto items-start flex flex-col p-2 my-2 "
                                  )}
                                  key={index}
                                >
                                  <div className="relative flex flex-row justify-between h-5% gap-3">
                                    <div className="text-white text-sm font-semibold">
                                      {message.sender.displayName.split(",")[0]}
                                      :
                                    </div>
                                    <div className="text-[12px] font-semibold text-white">
                                      {/* {console.log(`TimeStamp: ${JSON.stringify(message)}`)} */}
                                      {message?.timeStamp}
                                    </div>
                                  </div>
                                  {message.isLink && (
                                    <div className="w-full h-full flex flex-col">
                                      <div
                                        className={cn(
                                          message.sender.displayName ===
                                            me.displayName
                                            ? "bg-[#36435d7e]"
                                            : "bg-[#5D8BF475]",
                                          "relative flex flex-row items-center w-full h-6 rounded-[5px] p-1"
                                        )}
                                      >
                                        <FcFile />{" "}
                                        <div className="text-xs">IPFS File</div>
                                      </div>
                                      <div className="relative px-3 mt-1 text-sec-blue">
                                        <a
                                          href={`https://${message.message}`}
                                          target="_blank"
                                        >
                                          {message.fileName}
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                  {message.isLink == null && (
                                    <div className="relative mt-1 text-black">
                                      {message.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                        })
                    : "No messages yet"}
                </div>
              </div>
            </div>

            {/* Group messages */}
            <div
              className={cn(
                !privateMode ? "w-85% h-75%" : "w-0 h-0",
                "relative flex flex-col overflow-y-scroll ease-in-out duration-300"
              )}
            >
              {console.log(`roomMessages: ${JSON.stringify(roomMessages)}`)}
              {roomMessages.map((message, index) => {
                if (message.kind == "group")
                  return (
                    <div
                      className={cn(
                        message.sender.displayName === me.displayName
                          ? "justify-end"
                          : "justify-start",
                        "flex flex-row items-center w-full h-auto"
                      )}
                    >
                      <div
                        className={cn(
                          message.sender.displayName === me.displayName
                            ? "bg-[#5D8BF475] right-1 rounded-tr-none rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px]"
                            : "bg-[#aacc] left-1 rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-none",
                          "w-auto flex flex-col p-2 my-2 "
                        )}
                        key={index}
                      >
                        {" "}
                        {console.log(
                          `me: ${me.displayName === message.sender.displayName}`
                        )}
                        <div className="relative flex flex-row justify-between gap-3 h-5%">
                          <div className="text-white text-sm font-semibold">
                            {message.sender.displayName.split(",")[0]}:
                          </div>
                          <div className="text-[12px] font-semibold text-white">
                            {/* {console.log(`TimeStamp: ${JSON.stringify(message)}`)} */}
                            {message?.timeStamp}
                          </div>
                        </div>
                        
                        {message.isLink && (
                          <div className="w-full h-full flex flex-col">
                            <div
                              className={cn(
                                message.sender.displayName === me.displayName
                                  ? "bg-[#36435d7e]"
                                  : "bg-[#5D8BF475]",
                                "relative flex flex-row items-center w-full h-6 rounded-[5px] p-1"
                              )}
                            >
                              <FcFile />{" "}
                              <div className="text-xs">IPFS File</div>
                            </div>
                            <div className="relative px-3 mt-1 text-sec-blue">
                              <a
                                href={`https://${message.message}`}
                                target="_blank"
                              >
                                {message.fileName}
                              </a>
                            </div>
                          </div>
                        )}
                        {!message.isLink && (
                          <div className="relative mt-1 text-black">
                            {message.message}
                          </div>
                        )}
                      </div>
                    </div>
                  );
              })}
            </div>

            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% gap-2 rounded-[5px] bg-white">
              <input
                type="text"
                placeholder="Type your message"
                onChange={(e) => setGroupMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                value={groupMessage}
                className="w-3/5 h-80% p-3 rounded-[5px] active:text-white"
              />
              <div className="w-1/6 h-80% flex items-center justify-center text-lg cursor-pointer hover:text-[#5D8BF4] active:bg-slate-300 rounded-full ease-in-out duration-300">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="w-0 h-0"
                  onChange={handleChange}
                />
                <label for="file">
                  {" "}
                  <FiArrowDown onClick={uploadToIpfs} />
                </label>
                {/* </input> */}
              </div>
              <div
                className="flex items-center justify-center w-2/12 h-80% bg-[#5D8BF4] hover:bg-[#5D8BF450] rounded-[5px] cursor-pointer active:h-75% ease-in-out duration-300"
                onClick={() => {
                  if (groupMessage == "") {
                    return console.log("Empty message");
                  }
                  console.log("message", {
                    sender: me,
                    message: groupMessage,
                    kind: talkTo == "*" ? "group" : "private",
                    receiver: talkTo == "*" ? "*" : talkTo,
                    timeStamp: formatTime(new Date().getTime()),
                  });
                  const peerIdsToSend = talkTo == "*" ? "*" : [talkTo];
                  sendData(peerIdsToSend, {
                    sender: me,
                    message: groupMessage,
                    kind: talkTo == "*" ? "group" : "private",
                    receiver: talkTo == "*" ? "*" : talkTo,
                    timeStamp: formatTime(new Date().getTime()),
                  });
                  addRoomMessage({
                    sender: me,
                    message: groupMessage,
                    kind: talkTo == "*" ? "group" : "private",
                    receiver: talkTo == "*" ? "*" : talkTo,
                    timeStamp: formatTime(new Date().getTime()),
                  });
                  console.log(
                    "sent group message - ",
                    groupMessage,
                    " - to ",
                    peerIdsToSend
                  );
                  setGroupMessage("");
                }}
              >
                <SendMessage />
              </div>
              <div
                className="flex items-center justify-center w-1/6 h-80% bg-[#4cb6cc] hover:bg-[#5D8BF450]  rounded-[5px] cursor-pointer active:h-75% ease-in-out duration-300"
                onClick={() => {
                  const role = prompt("Enter role to send");
                  if (role) {
                    const peerIdsToSend = roomPeerRoles[role];
                    console.log(roomPeerRoles);
                    peerIdsToSend.forEach((peerId) => {
                      if (peerId) {
                        sendData([peerId], {
                          sender: me,
                          message: groupMessage,
                          kind: "private",
                          receiver: peerId,
                          receivers: peerIdsToSend,
                          timeStamp: formatTime(new Date().getTime()),
                        });
                        addRoomMessage({
                          sender: me,
                          message: groupMessage,
                          kind: "private",
                          receiver: peerId,
                          receivers: peerIdsToSend,
                          timeStamp: formatTime(new Date().getTime()),
                        });
                        console.log(
                          "sent group message - ",
                          groupMessage,
                          " - to ",
                          peerIdsToSend
                        );
                        setGroupMessage("");
                      }
                    });
                  }
                }}
              >
                <span className="text-2xl text-black absolute"><BsShieldLockFill /></span> <SendMessage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
