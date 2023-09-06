import { ethers } from "ethers";

const getWalletDetails = async () => {
    if (!window.ethereum)
        return { address: null, signer: null, provider: null };

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = provider.getSigner();
    const address = (await signer).getAddress();
    return { address, signer, provider };
};

export {
    getWalletDetails
}