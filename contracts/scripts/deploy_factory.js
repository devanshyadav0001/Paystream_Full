const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying PayStreamFactory with:", deployer.address);
    console.log("Network:", hre.network.name);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Deployer balance:", hre.ethers.formatEther(balance), "HLUSD");

    console.log("\nDeploying PayStreamFactory...");
    const PayStreamFactory = await hre.ethers.getContractFactory("PayStreamFactory");
    const factory = await PayStreamFactory.deploy();
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();

    console.log("\n========================================");
    console.log("  FACTORY DEPLOYMENT COMPLETE");
    console.log("========================================");
    console.log("  Network:          ", hre.network.name);
    console.log("  PayStreamFactory: ", factoryAddress);
    console.log("  Deployer:         ", deployer.address);
    console.log("========================================");
    console.log("\nUpdate your frontend/src/utils/contract.js:");
    console.log(`  FACTORY_ADDRESS = "${factoryAddress}"`);
    console.log("========================================\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
