import React from "react";
import TextField from "@mui/material/TextField";

const AddParticipants = () => {
  return (
    <div className="flex items-end  ">
      <div className=" bg-[#EDF2FE] border-4 border-blue-500 right-72 w-72 h-96 mb-8 rounded-lg z-40 absolute p-5">
        <div className="py-2 w-50 h-fit flex justify-center">
          <TextField
            variant="outlined"
            type="text"
            fullWidth
            label="Search.."
            size="small"
            name="meet-title "
            className="w-10/12"
          />
        </div>

        <div className=" w-full h-fit my-2 flex justify-between items-center border-2 rounded-l-full  ">
          <div className="p-3 bg-[#cdb0ff] rounded-full absolute z-10">RG</div>
          <div className="w-full py-3 rounded-l-full pl-14 pr-4 bg-white border-[#acacac] border-2 flex justify-between ">
            <label for="mic" className="text-sm">
              Rakshanda Giri
            </label>
            <input
              type="radio"
              id="mic"
              name="mic"
              value="mic"
              className="w-5 h-5 "
            ></input>
          </div>
        </div>

        <div className=" w-full h-fit my-2 flex justify-between items-center border-2 rounded-l-full  ">
          <div className="p-3 bg-yellow-400 rounded-full absolute z-10">RB</div>
          <div className="w-full py-3 rounded-l-full pl-14 pr-4 bg-white border-[#acacac] border-2 flex justify-between ">
            <label for="mic" className="text-sm">
              Rishita Bura
            </label>
            <input
              type="radio"
              id="mic"
              name="mic"
              value="mic"
              className="w-5 h-5 "
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParticipants;
