'use client'

import React, {useState} from 'react'
import Navbar from '../schedule-meets/components/Navbar'
import Sidebar from '../schedule-meets/components/Sidebar'
import GroupsContacts from './components/GroupsContacts'
import AddContact from './components/AddContact'
import CreateGroup from './components/CreateGroup'

const Phonebook = () => {

    const [addGroup, setAddGroup] = React.useState(false);
    const [addContact, setAddContact] = React.useState(false);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full bg-white'>
        {addGroup && <CreateGroup />}
        {addContact && <AddContact />}
        <Navbar />
        <div className="flex flex-row w-full h-90% items-center justify-between">
            <Sidebar />
            <GroupsContacts addContact={addContact} setAddContact={setAddContact} addGroup={addGroup} setAddGroup={setAddGroup} />
        </div>
        
    </div>
  )
}

export default Phonebook