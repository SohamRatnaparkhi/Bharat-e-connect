import React from 'react'
import '../../globals.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Signup = () => {
  return (
    <main className="h-screen grid place-content-center bg-white">

    <div className=" w-screen grid place-content-center">
    <div className="flex items-center w-full space-x-4 p-6  text-black">
        {/* <h1 className="text-white">Hello</h1> */}

        <div className=" p-6 border-r-2">
              <div className="mr-20">
                <img src='../logos/logo.svg' className="h-full"  />
              </div>
        </div>

        <div className=" p-6 h-full">
            <div className=" p-6 w-96 ">
              <form  >
                  {/* <input type='text' placeholder='Email-id'  className="p-2 w-full rounded-md text-black"/>
                  <input type='text' placeholder='Username'  className="p-2 w-full rounded-md text-black"/> */}
                   <Box
                      // component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    ></Box>
                  <div className="py-3 ">
                  <TextField variant="outlined" type="email" fullWidth label="Email" required size='small' name="email"/>
                    </div> 
                  <div className="py-3">
                  <TextField variant="outlined" type="text" fullWidth label="Username"  size='small' name="username"/>
                  </div>
                 
                  <div className="py-3">
                  <TextField variant="outlined" type="text" fullWidth label="Ethereum Address" required size='small' name="ethereum"/>
                  </div>

                  <div className="py-3">
                  <TextField variant="outlined" type="password" fullWidth label="Password" required size='small' name="password"/>
                  </div>

                  <div className="py-3">
                  <TextField variant="outlined" type="password" fullWidth label="Confirm Password" required size='small' name="confirm-password"/>
                  </div>
                  
                  <div className="w-full mt-12 flex justify-center">
                    <button type="button" className="p-2 w-6/12 rounded-lg border-2 bg-[#5D8BF4] text-white">Signup</button>
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