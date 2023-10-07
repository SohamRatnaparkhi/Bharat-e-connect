"use client";

import React, { useEffect } from "react";
import { FiPlusSquare } from "react-icons/fi";
import Image from "next/image";

const GroupsContacts = ({addContact, setAddContact, addGroup, setAddGroup, phonebookData }) => {
  console.log(phonebookData)
  const [filteredData, setFilteredData] = React.useState(phonebookData);
  const [search, setSearch] = React.useState("");
  console.log(filteredData)
  useEffect(() => {
    const data = filterData();
    console.log(data)
    setFilteredData(data);
  }, [search]);

  useEffect(() => {
    if (filteredData.length > 0) return;
    setFilteredData(phonebookData);
  }, [phonebookData]);

  const filterData = () => {
    const newData = phonebookData.filter((contact) => {
      return contact.name.toLowerCase().includes(search.toLowerCase()) || contact.address.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(newData.length > 0 ? newData : phonebookData);
    return newData;
  }
  return (
    <div className="relative flex justify-end w-9/12 h-5/6">
      <div className="flex flex-col justify-between items-center rounded-l-[30px] bg-white w-full border-4 border-[#EDF2FE]">
        <div className="flex flex-col w-90%  h-1/2">
          <div className="relative flex flex-row items-center justify-between w-90% h-20% m-4 border-b-[1px] border-[#dddddd] cursor-pointer">
            <div className="flex flex-row gap-4">
              <div className="font-semibold text-lg">Groups</div>
              <input
                className="border-[2px] border-[#bbbbbb] px-3 rounded-[8px] active:border-[#bbbbbb]"
                type="text"
                placeholder=" Search"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-auto gap-5 h-full ">
              <div onClick={() => {setAddGroup(!addGroup)}} className="text-2xl hover:text-[#5D8BF4] ease-in-out duration-200">
                {" "}
                <FiPlusSquare />{" "}
              </div>
              <div className="text-am p-1 px-8 rounded-[8px] border-[#aaaaaa] border-[1px] bg-[#EDF2FE]">
                {" "}
                View all{" "}
              </div>
            </div>
          </div>

          {/* Group Icon */}
          <div className="relative flex flex-row items-center justify-between w-full h-80%  ">
            <div className="relative w-[125px] h-[130px] bg-blue-300 mx-8 rounded-[20px]">
              <img src="/images/group-image.png" className=" w-full h-full" />
              <div className="z-10 absolute bottom-0 w-full h-2/5 bg-[#5D8BF4] rounded-b-[20px] flex flex-col items-center justify-center text-white">
                <span>Executive</span>
                <span>Committee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-90% h-1/2 ">
          <div className="flex flex-row items-center justify-between w-90% h-20% m-4 pb-2 border-b-[1px] border-[#dddddd] cursor-pointer">
            <div className="flex flex-row gap-4">
              <div className="font-semibold text-lg">Contacts</div>
              <input
                className="border-[2px] border-[#bbbbbb] px-3 rounded-[8px] active:border-[#bbbbbb]"
                type="text"
                placeholder=" Search"
                onChange={(e) => {
                  setSearch(e.target.value)
                  filterData()
                }}
              />
            </div>

            <div className="flex flex-row items-center justify-between w-auto gap-5 h-full ">
              <div onClick={() => {setAddContact(!addContact)}} className="text-2xl hover:text-[#5D8BF4] ease-in-out duration-200">
                {" "}
                <FiPlusSquare />{" "}
              </div>
              <div className="text-am p-1 px-8 rounded-[8px] border-[#aaaaaa] border-[1px] bg-[#EDF2FE]">
                {" "}
                View all{" "}
              </div>
            </div>
          </div>

          <div className="relative flex flex-row items-center justify-between w-full h-80%">
            <div className="grid grid-cols-2 h-full w-full">
              <div className="flex flex-col items-center  w-full h-80% border-r-[1px] border-[#aaaaaa]">
                <div className="flex flex-col items-center w-90% h-90% gap-5 max-h-[235px] overflow-y-scroll">
                  
                  {filteredData
                    ?.map((contact, index) => {

                      if(index%2==1){
                      return(
                    <div className="flex flex-row items-center justify-start gap-5 w-90% h-30% ">
                    <div className="h-[50px] w-[50px] rounded-full bg-[#9d4f4f] text-xl text-white text-center flex items-center justify-center">{contact?.name?.substring(0, 2)}</div>
                    <div className="flex flex-col justify-evenly p-3 w-70% h-full bg-white ">
                      <div className="text-sm font-semibold ">
                        {contact.name}
                      </div>
                            <div className="text-[12px] text-[#777777]">{contact.address?.substring(0, 6)}...{contact.address?.substring(36,40)}</div>
                    </div>
                  </div>);
                      }
                 })}

                </div>
              </div>

              <div className="flex flex-col items-center  w-full h-80%">
                <div className="flex flex-col items-center w-90% h-90% gap-5 max-h-[235px] bg-white overflow-y-scroll">
                
                  {filteredData
                    ?.map((contact, index) => {
                      if(index%2==0){
                      return(
                    <div className="flex flex-row items-center justify-start gap-5 w-90% h-30% ">
                    <div className="h-[50px] w-[50px] rounded-full bg-red-300 text-xl text-white text-center flex items-center justify-center">{contact?.name?.substring(0, 2)}</div>
                    <div className="flex flex-col justify-evenly p-3 w-70% h-full bg-white ">
                      <div className="text-sm font-semibold ">
                        {contact.name || contact.email}
                      </div>
                      <div className="text-[12px] text-[#777777]">{contact.address?.substring(0, 6)}...{contact.address?.substring(36,40)}</div>
                    </div>
                  </div>);
                      }
                 })}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsContacts;
