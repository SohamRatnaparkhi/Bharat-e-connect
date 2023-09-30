"use client";
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAppStore } from '../store/AppStore';

const Login = () => {
  const setLogin = useAppStore(state => state.setLogin)
  const setUser = useAppStore(state => state.setUser)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const router = useRouter()
  const handleLogin = async () => {
    const { data } = await axios.post('/api/users/', {
      email,
      password,
      ethAddress
    });
    if (data?.ethAddress) {
      setLogin(true)
      setUser(data)
      router.push('/schedule-meets')
    } else {
      alert("Something went wrong");
    }
  }
  return (
    <main className="h-screen grid place-content-center bg-white">

      <div className=" w-screen grid place-content-center">
        <div className="flex items-center w-full space-x-4 p-6  text-black">
          <div className=" p-6 border-r-2">
            <div className="mr-20">
              <img src='../logos/Logo.svg' className="h-full" />
            </div>
          </div>

          <div className=" p-6 ">
            <div className=" p-6 w-96 ">
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                ></Box>
                <div className="py-3 w-11/12">
                  <TextField variant="outlined" type="email" fullWidth label="Email" required size='small' name="email" onChange={(e) => {setEmail(e.target.value)}} />
                </div>

                <div className="py-3 w-11/12">
                  <TextField variant="outlined" type="password" fullWidth label="Password" required size='small' name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="py-3 w-11/12">
                  <TextField variant="outlined" type="address" fullWidth label="Ethereum Address" required size='small' name="ethereum" onChange={(e) => setEthAddress(e.target.value)} />
                </div>

                <div className="mt-8">
                  <ReCAPTCHA className="" sitekey="6LdlMj4oAAAAAFc_Y7V5jXq6DTqzOgYI9AaXf6Bz" />
                </div>

                <div className="w-11/12 mt-12   flex justify-center">
                  <button type="button" className="p-2 w-6/12 rounded-lg border-2 bg-[#5D8BF4] text-white" onClick={handleLogin}>Login</button>
                </div>

                <div className="w-11/12 mt-7 flex justify-center text-sm">
                  Not yet Registered? <a href='./signup' className="text-[#98BCF4] "> &nbsp; Register now</a>
                </div>
              {/* </form> */}
            </div>
          </div>

        </div>

      </div>

    </main>
  )
}

export default Login