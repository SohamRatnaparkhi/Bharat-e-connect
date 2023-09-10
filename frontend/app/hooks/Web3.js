import { ethers } from "ethers";

const getWalletDetails = async () => {
    if (!window.ethereum)
        return { address: "", signer: null, provider: null };

    const web3Provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await web3Provider.getSigner();
    const address = await signer.getAddress();
    return { address, signer, web3Provider };
};

const checkSBTBalance = async () => {
    return true;
}


export {
    getWalletDetails,
    checkSBTBalance,
}