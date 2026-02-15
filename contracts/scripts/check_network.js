
const hre = require("hardhat");

async function main() {
    console.log("Checking network connection...");
    const [deployer] = await hre.ethers.getSigners();
    console.log("Account:", deployer.address);
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Balance:", hre.ethers.formatEther(balance), "HLUSD");
    console.log("Network:", hre.network.name);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
