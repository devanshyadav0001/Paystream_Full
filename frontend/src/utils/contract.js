import { ethers } from "ethers";
import PayStreamABI from "../hooks/PayStream.json";

// ─── PayStream on HeLa Testnet ───
export const CONTRACT_ADDRESS = "0x4C2F7092C2aE51D986bEFEe378e50BD4dB99C901";

// ─── HeLa Testnet Chain Config ───
export const HELA_TESTNET = {
    chainId: "0xA30F8",           // 666888 in hex
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
            params: [HELA_TESTNET],
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

export const getContract = (signerOrProvider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, PayStreamABI.abi, signerOrProvider);
};

export const formatHLUSD = (amount) => {
    return parseFloat(ethers.formatUnits(amount, 18)).toFixed(4);
};

export const parseHLUSD = (amount) => {
    return ethers.parseUnits(amount.toString(), 18);
};
