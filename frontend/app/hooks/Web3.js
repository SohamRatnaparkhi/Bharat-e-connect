import { ethers } from "ethers";

const getWalletDetails = async () => {
    try {
        if (!window.ethereum)
            return { address: "", signer: null, provider: null };

        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        return { address, signer, web3Provider };
    } catch (error) {
        const permissions = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
        });
        if (permissions) {
            const address = permissions[0].caveats[0].value;
            return { address, signer: null, provider: null };
        } else {
            return { address: "", signer: null, provider: null };
        }
    }
};

const checkSBTBalance = async () => {
    return true;
}


export {
    getWalletDetails,
    checkSBTBalance,
}