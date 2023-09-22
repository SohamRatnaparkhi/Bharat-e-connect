import cn from "@/app/utils/cn";
import { TextField } from "@mui/material";
import React from "react";

const CreateGroup = ({ addGroup, setAddGroup }) => {
  const [addContact, setAddContact] = React.useState(false);

  return (
    <div className="absolute z-20 flex flex-flex-row items-center justify-center w-full h-full bg-[#000000DB]">
      <div className="z-30 relative w-2/6 h-70% bg-white border-[1px] border-black rounded-[15px] flex flex-col items-center justify-evenly p-5 py-10">
        <div className="w-80% h-auto">
          <input
            placeholder="Group Name"
            className="w-full h-10 border-[#bbbbbb] border-[1px] rounded-[10px] px-3"
          />
        </div>

        <div
          onClick={() => {
            setAddContact(!addContact);
            console.log("Add contacts pressed " + addContact);
          }}
          className="flex flex-row items-center w-80% h-auto cursor-pointer "
        >
          <div className="w-full h-10 border-[#bbbbbb] border-[1px] rounded-[10px] px-3 flex flex-row items-center justify-start text-[#aaaaaa]">
            Add Contacts
          </div>
        </div>

        <div className="w-80% h-auto">
          <input
            type="file"
            placeholder={"Add Image"}
            className="relative flex flex-row items-center w-full h-10 border-[#bbbbbb] border-[1px] rounded-[10px] px-3 pt-2 file:absolute file:right-2 file:p-1 file:px-2 file:mb-[6px] file:text-sm file:rounded-[10px] file-bg-white file:border-[1px] "
          />
        </div>

        <div className="h-10% w-80% flex flex-row justify-between">
          <button
            onClick={() => {
              setAddGroup(false);
            }}
            className="w-2/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#7E7E7E80]"
          >
            Cancel
          </button>
          <button className="w-3/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#5D8BF4]">
            Create Group
          </button>
        </div>
      </div>
      <div
            className={cn(
              addContact ? " w-1/4 h-70%" : "w-0 h-0",
              "z-30 relative bg-white rounded-[20px] border-[1px] border-[#bbbbbb] left-2 ease-in-out duration-300 "
            )}
          >

      </div>
    </div>
  );
};

export default CreateGroup;
