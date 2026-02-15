const hre = require("hardhat");

async function main() {
    const PAYSTREAM_ADDRESS = "0x99dBE4AEa58E518C50a1c04aE9b48C9F6354612f"; // Current Contract
    const NEW_OWNER = "0x93035857E830512e4FF9ADc1aa19439a814F9D62"; // User's Address

    const [deployer] = await hre.ethers.getSigners();
    console.log("Transferring ownership...");
    console.log("Current Owner (Deployer):", deployer.address);
    console.log("Target Owner:", NEW_OWNER);

    const PayStream = await hre.ethers.getContractFactory("PayStream");
    const payStream = PayStream.attach(PAYSTREAM_ADDRESS);

    // Check current owner
    const currentOwner = await payStream.owner();
    if (currentOwner.toLowerCase() !== deployer.address.toLowerCase()) {
        console.error("Error: Deployer is not the owner. Cannot transfer.");
        return;
    }

    const tx = await payStream.transferOwnership(NEW_OWNER);
    await tx.wait();

    console.log("✅ Ownership transferred successfully!");
    console.log("New Owner:", await payStream.owner());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
