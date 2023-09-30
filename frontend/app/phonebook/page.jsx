"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../schedule-meets/components/Navbar";
import Sidebar from "../schedule-meets/components/Sidebar";
import GroupsContacts from "./components/GroupsContacts";
import AddContact from "./components/AddContact";
import CreateGroup from "./components/CreateGroup";
import axios from "axios";
import { useAppStore } from "../store/AppStore";
import { useRouter } from "next/navigation";

const Phonebook = () => {
  const [addGroup, setAddGroup] = React.useState(false);
  const [addContact, setAddContact] = React.useState(false);
  const router = useRouter();
  const [phonebookData, setPhonebookData] = useState([]);

  const user = useAppStore(state => state.user)

  useEffect(() => {
    const getData = async () => {
      console.log(user)
      if (!user) {
        router.push('/login')
      }
      const { data } = await axios.get("/api/phonebook/" + user.userId);
      setPhonebookData(data);
    };
    getData();
  }, []);
  console.log(phonebookData)
  const addContactHandler = async (name, address) => {
    const response = await axios
      .post("/api/phonebook/", {
        name: name,
        address: address,
        userId: user.userId,
      })
      .then((res) => {
        console.log(res.json());
        window.location.reload();
      })
      .catch(function (error) {
        console.log(`Post req: ${error}`);
      });
  };


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
        {/* {console.log("Phone" + phonebookData)} */}
      </div>
    </div>
  );
};

export default Phonebook;
