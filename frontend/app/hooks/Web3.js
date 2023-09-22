import { ethers } from "ethers";
import  contract from "../../contracts/ERC.json";

const getWalletDetails = async () => {
  if (!window.ethereum)
    return { address : null, signer : null, provider : null };

  await window.ethereum.send("eth_requestAccounts");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { address, signer, provider };
};

const checkSBTBalance = async () => {
    return true;
}

const deployContract = async (UserName) => {
    const { address, signer } = await getWalletDetails();
    const UserSBT = UserName + "SBT";
  try {
    console.log(contract)
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
    console.log(error)
    throw new Error(error);
  }
};

const mintSingleSBT = async (EthAddress, URI, contractAddress) => {
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

const mintMultipleSBT = async (EthAddresses, URI, contractAddress) => {
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