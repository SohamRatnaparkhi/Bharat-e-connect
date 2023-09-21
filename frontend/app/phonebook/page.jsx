import React from 'react'
import Navbar from '../schedule-meets/components/Navbar'
import Sidebar from '../schedule-meets/components/Sidebar'
import GroupsContacts from './components/GroupsContacts'

const Phonebook = () => {
  return (
    <div className='w-full h-full bg-white'>
        <Navbar />
        <div className="flex flex-row w-full h-90% items-center justify-between">
            <Sidebar />
            <GroupsContacts />
        </div>
        
    </div>
  )
}

export default Phonebook