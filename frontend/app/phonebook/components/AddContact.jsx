import { TextField } from "@mui/material";
import React from "react";

const AddContact = () => {
  return (
    <div className="z-30 absolute w-2/6 h-1/2 bg-white border-[1px] border-black rounded-[15px] flex flex-col items-center justify-evenly p-5 py-10">
      <div className="w-80% h-auto">
        <TextField
          variant="outlined"
          type="text"
          label="Name"
          required
          fullWidth
          size="small"
          name="email"
        />

        
      </div>

      <div className="w-80% h-auto">
        <TextField
          variant="outlined"
          type="text"
          label="Ethereum Address"
          required
          fullWidth
          size="small"
          name="email"
        />

        
      </div>

      


      <div className="h-15% w-80% flex flex-row justify-between">
        <button className="w-2/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#7E7E7E80]">
          Cancel
        </button>
        <button className="w-3/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#5D8BF4]">
          Add Contact
        </button>
      </div>

    </div>
  );
};

export default AddContact;
