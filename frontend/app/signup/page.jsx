"use client";

import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppStore } from '../store/AppStore';
import { deployContract } from '../hooks/Web3';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [ethAddress, setEthAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const setLogin = useAppStore(state => state.setLogin)
  const setUser = useAppStore(state => state.setUser)
  const router = useRouter()
  const handleSignup = async () => {
    const contract = await deployContract('abc def');
    console.log(contract.address ?? 'no address')
    const { data } = await axios.put('/api/users/', {
      email,
      name: username,
      ethAddress,
      contractAddress: contract.address,
      password,
    });
    if (data?.ethAddress) {
      setLogin(true)
      setUser(data)
      alert("Signup successful")
      router.push('/login')
    } else {
      alert("Something went wrong");
    }
  }
  return (
    <main className="h-screen grid place-content-center bg-white">

      <div className=" w-screen grid place-content-center">
        <div className="flex items-center w-full space-x-4 p-6  text-black">
          {/* <h1 className="text-white">Hello</h1> */}

          <div className=" p-6 border-r-2">
            <div className="mr-20">
              <img src='../logos/Logo.svg' className="h-full" />
            </div>
          </div>

          <div className=" p-6 h-full">
            <div className=" p-6 w-96 ">
              <form  >
                <Box
                  // component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                ></Box>
                <div className="py-3 ">
                  <TextField variant="outlined" type="email" fullWidth label="Email" required size='small' name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="py-3">
                  <TextField variant="outlined" type="text" fullWidth label="Username" size='small' name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="py-3">
                  <TextField variant="outlined" type="text" fullWidth label="Ethereum Address" required size='small' name="ethereum" onChange={(e) => setEthAddress(e.target.value)} />
                </div>

                <div className="py-3">
                  <TextField variant="outlined" type="password" fullWidth label="Password" required size='small' name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="py-3">
                  <TextField variant="outlined" type="password" fullWidth label="Confirm Password" required size='small' name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div className="w-full mt-12 flex justify-center">
                  <button type="button" className="p-2 w-6/12 rounded-lg border-2 bg-[#5D8BF4] text-white" onClick={handleSignup}>Signup</button>
                </div>

                <div className="w-full  mt-7 flex justify-center text-sm">
                  Already have account? <a href='./login' className="text-[#98BCF4] "> &nbsp; Login now</a>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    </main>
  )
}

export default Signup 