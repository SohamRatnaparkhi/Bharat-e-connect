import React from "react";

const AddContact = ({addContact, setAddContact, addContactHandler}) => {

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const submitContact = async () => {
    await addContactHandler(name, address);
    setAddContact(false);
    window.location.reload();
  }

  return (
    <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full bg-[#000000DB]">
      <div className="z-30 absolute w-2/6 h-1/2 bg-white border-[1px] border-black rounded-[15px] flex flex-col items-center justify-evenly p-5 py-10">
      <div className="w-80% h-auto">
          <input
            placeholder="Name"
            className="w-full h-10 border-[#bbbbbb] border-[1px] rounded-[10px] px-3"
            
            onChange={(e)=>{setName(e.target.value)}}
          />
        </div>

        <div className="w-80% h-auto">
          <input
            placeholder="Ethereum Address"
            className="w-full h-10 border-[#bbbbbb] border-[1px] rounded-[10px] px-3"

            onChange={(e)=>{setAddress(e.target.value)}}
          />
        </div>

        <div className="h-15% w-80% flex flex-row justify-between">
          <button onClick={()=>{setAddContact(false)}} className="w-2/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#7E7E7E80] hover:bg-[#7E7E7E50]">
            Cancel
          </button>
          <button onClick={submitContact} className="w-3/6 rounded-[10px] h-full text-white font-bold text-sm bg-[#5D8BF4] hover:bg-#[#5D8BF450] active:w-2/5 ease-in-out duration-300">
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
