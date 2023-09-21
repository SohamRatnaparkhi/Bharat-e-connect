import { useMeetingStore } from "@/app/store/MeetingStore";
import React from "react";

const PrivateChat = ({ peers, me }) => {
  const roomMessages = useMeetingStore((state) => state.roomMessages);
  return (
    <div>
      PrivateChat
      <div>
        {roomMessages.map((message, index) => {
          if (message.kind == "private")
            return (
              <div key={index}>
                <p>
                  {message.sender.displayName} - {message.message} -{" "}
                  {message.timeStamp}
                </p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default PrivateChat;
