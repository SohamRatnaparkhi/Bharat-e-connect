import React, { useState , createContext, Children} from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);
    const connectwalletHandler = async () => {
        if (window.ethereum) {
            window.web3 = new Web3();
            try {
              console.log("Installed");
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUser(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

        
    
    const accountChangedHandler = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
              window.ethereum.on("accountsChanged", (accounts) => {
                setUser(accounts[0]);
                console.log(accounts[0]);
              });
            } else {
              /* MetaMask is not installed */
              setUser("");
              console.log("Please install MetaMask");
            }
          };
        
    
    // const getuserBalance = async (address) => {
    //     const balance = await provider.getBalance(address, "latest")
    //     setUserBalance(balance);
    // }

  const disconnectWallet = () =>{
      setUser(null);
  }

    return (
        <UserContext.Provider value={{ user, setUser, connectwalletHandler, accountChangedHandler, disconnectWallet }}>
        {children}
        </UserContext.Provider>
        
    )
}
export default UserProvider;
