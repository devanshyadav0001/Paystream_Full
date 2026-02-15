import { ethers } from "ethers";
import PayStreamABI from "../hooks/PayStream.json";
import PayStreamFactoryABI from "../hooks/PayStreamFactory.json";

// ─── PayStream on HeLa Testnet ───
// ─── PayStream on HeLa Testnet ───
export const CONTRACT_ADDRESS = ""; // Default/Legacy
export const FACTORY_ADDRESS = ""; // Update after factory deployment

// ─── HeLa Testnet Chain Config ───
export const HELA_TESTNET = {
    chainId: "0xA2D08",           // 666888 in hex
    chainName: "HeLa Testnet",
    rpcUrls: ["https://testnet-rpc.helachain.com"],
    blockExplorerUrls: ["https://testnet-blockexplorer.helachain.com"],
    nativeCurrency: {
        name: "HLUSD",
        symbol: "HLUSD",
        decimals: 18,
    },
};

// Add HeLa network to wallet
export const addHelaNetwork = async () => {
    if (!window.ethereum) throw new Error("No wallet detected");
    try {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [HELA_TESTNET], // Using precise configuration defined above
        });
        return true;
    } catch (err) {
        console.error("Failed to add HeLa network:", err);
        return false;
    }
};

// Switch to HeLa testnet
export const switchToHela = async () => {
    if (!window.ethereum) throw new Error("No wallet detected");
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: HELA_TESTNET.chainId }],
        });
        return true;
    } catch (err) {
        if (err.code === 4902) {
            return await addHelaNetwork();
        }
        console.error("Failed to switch to HeLa:", err);
        return false;
    }
};

// Ensure wallet is on HeLa Testnet
export const ensureHelaNetwork = async () => {
    if (!window.ethereum) return false;
    const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
    if (currentChainId.toLowerCase() === HELA_TESTNET.chainId.toLowerCase()) {
        return true;
    }
    return await switchToHela();
};

// Check if currently on HeLa
export const isOnHelaNetwork = async () => {
    if (!window.ethereum) return false;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    return chainId.toLowerCase() === HELA_TESTNET.chainId.toLowerCase();
};

export const getContract = (signerOrProvider, address = CONTRACT_ADDRESS) => {
    return new ethers.Contract(address, PayStreamABI.abi, signerOrProvider);
};

export const getFactoryContract = (signerOrProvider) => {
    return new ethers.Contract(FACTORY_ADDRESS, PayStreamFactoryABI.abi, signerOrProvider);
};

export const createOrganization = async (signer) => {
    try {
        const owner = await signer.getAddress();
        const factory = new ethers.ContractFactory(PayStreamABI.abi, PayStreamABI.bytecode, signer);
        // Deploys PayStream and sets signer as initial owner
        const contract = await factory.deploy(owner, {});
        await contract.waitForDeployment();
        const address = contract.target;
        console.log("Deployed PayStream at:", address);
        return address;
    } catch (error) {
        console.error("Deployment failed:", error);
        throw error;
    }
};

export const getUserOrganizations = async (signerOrProvider, userAddress) => {
    // For MVP without backend factory, we rely on local storage
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("paystream_org");
        return stored ? [stored] : [];
    }
    return [];
};

// Check if current user is owner
export const isOwner = async (signerOrProvider, contractAddress, userAddress) => {
    try {
        const contract = getContract(signerOrProvider, contractAddress);
        const owner = await contract.owner();
        return owner.toLowerCase() === userAddress.toLowerCase();
    } catch (e) {
        console.error("Failed to check owner:", e);
        return false;
    }
};

export const getOwner = async (signerOrProvider, contractAddress) => {
    try {
        const contract = getContract(signerOrProvider, contractAddress);
        return await contract.owner();
    } catch (e) {
        console.error("Failed to get owner:", e);
        return null;
    }
};

export const formatHLUSD = (amount) => {
    return parseFloat(ethers.formatUnits(amount, 18)).toFixed(4);
};

export const parseHLUSD = (amount) => {
    return ethers.parseUnits(amount.toString(), 18);
};
