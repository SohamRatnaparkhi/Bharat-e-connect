import { ethers } from "ethers";
import  contract from "../../contracts/ERC.json";

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

export const deployContract = async (UserName) => {
    const { address, signer } = await getWalletDetails();
    const UserSBT = UserName + "SBT";
  try {
    const factory = new ethers.ContractFactory(
      contract.abi,
      contract.bytecode,
      signer
    );
    const contractRes = await factory.deploy(UserName, UserSBT);
    await contractRes.deployed();
    console.log(contractRes.address);
    return contractRes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const mintSingleSBT = async (EthAddress, URI, contractAddress) => {
    const { address, signer } = await getWalletDetails();
  try {
    const contractInstance = new ethers.Contract(
        contractAddress,
        contract.abi,
        signer
    );
    const transaction = await contractInstance.safeMint(EthAddress, URI);
    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const mintMultipleSBT = async (EthAddresses, URI, contractAddress) => {
    const { address, signer } = await getWalletDetails();
    
  try {
    const contractInstance = new ethers.Contract(
        contractAddress,
        contract.abi,
        signer
    );
    const transaction = await contractInstance.safeMintOneToMany(EthAddresses, URI);
    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export {
    getWalletDetails,
    checkSBTBalance,
    deployContract,
    mintMultipleSBT,
    mintSingleSBT 
}