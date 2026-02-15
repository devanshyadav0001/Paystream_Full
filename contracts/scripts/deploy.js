const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying PayStream with:", deployer.address);
    console.log("Network:", hre.network.name);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Deployer balance:", hre.ethers.formatEther(balance), "HLUSD");

    // Deploy PayStream (uses native HLUSD, no token contract needed)
    console.log("\nDeploying PayStream...");
    const PayStream = await hre.ethers.getContractFactory("PayStream");
    const payStream = await PayStream.deploy(deployer.address);
    await payStream.waitForDeployment();
    const payStreamAddress = await payStream.getAddress();

    console.log("\n========================================");
    console.log("  DEPLOYMENT COMPLETE");
    console.log("========================================");
    console.log("  Network:          ", hre.network.name);
    console.log("  PayStream:        ", payStreamAddress);
    console.log("  Owner (HR):       ", deployer.address);
    console.log("========================================");
    console.log("\nUpdate your frontend/src/utils/contract.js:");
    console.log(`  CONTRACT_ADDRESS = "${payStreamAddress}"`);
    console.log("========================================\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
