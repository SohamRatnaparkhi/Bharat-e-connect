"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../schedule-meets/components/Navbar";
import Sidebar from "../schedule-meets/components/Sidebar";
import GroupsContacts from "./components/GroupsContacts";
import AddContact from "./components/AddContact";
import CreateGroup from "./components/CreateGroup";
import { async } from "regenerator-runtime";
import axios from "axios";

const Phonebook = () => {
  const [addGroup, setAddGroup] = React.useState(false);
  const [addContact, setAddContact] = React.useState(false);

  const [phonebookData, setPhonebookData] = useState([]);

  useEffect(() => {
    // fetch("api/phonebook/")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setPhonebookData(data);
    //   });
    const getData = async () => {
      const { data } = await axios.get("/api/nest/users/");
      setPhonebookData(data);
    };
    getData();
  }, []);
  console.log(phonebookData)
  const addContactHandler = async (name, address, userId) => {
    const response = await axios
      .post("/api/phonebook/", {
        name: name,
        address: address,
        userId: 'clmqll67z0001i0887xh2yn8l',
      })
      .then((res) => {
        return console.log(res.json());
      })
      .catch(function (error) {
        console.log(`Post req: ${error}`);
      });
  };

  // console.log(phonebookData)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      {addGroup && (
        <CreateGroup
          addGroup={addGroup}
          setAddGroup={setAddGroup}
          phonebookData={phonebookData}
        />
      )}
      {addContact && (
        <AddContact
          addContact={addContact}
          setAddContact={setAddContact}
          phonebookData={phonebookData}
          addContactHandler={addContactHandler}
        />
      )}
      <Navbar />
      <div className="flex flex-row w-full h-90% items-center justify-between">
        <Sidebar />
        <GroupsContacts
          addContact={addContact}
          setAddContact={setAddContact}
          addGroup={addGroup}
          setAddGroup={setAddGroup}
          phonebookData={phonebookData}
        />
        {console.log("Phone" + phonebookData)}
      </div>
    </div>
  );
};

export default Phonebook;
