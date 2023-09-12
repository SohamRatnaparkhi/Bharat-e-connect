import React, { useState, useEffect, useContext, createContext, Children } from 'react';
import { UserContext } from '../contexts/UserContext';


const MetaWallet = () => {

    const { user, connectwalletHandler, disconnectWallet } = useContext(UserContext);

    return (
        <body className>
            <div className>

                <div>
                    <button className='metamaskconnect'
                        // style={{ background: user ? "green" : "white", 
                        //          color: user ? "white" : "green"}}
                        onClick={connectwalletHandler}>
                        {user ? "Connected" : "Connect"}
                    </button>
                    <button className='metamaskdisconnect'
                        onClick={disconnectWallet}>Disconnect
                    </button>
                    <div className="displayAccount"><br />
                        <p className="walletAddress">Your Address : {user}</p>
                    </div>
                </div>
                <img src={metaimg} className="metaimg"></img>





            </div>
        </body>

    )
}
export default MetaWallet;





