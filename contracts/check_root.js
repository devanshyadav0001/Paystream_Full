const hre = require("hardhat");

async function main() {
    const PAYSTREAM_ADDRESS = "0x99dBE4AEa58E518C50a1c04aE9b48C9F6354612f";
    const PayStream = await hre.ethers.getContractFactory("PayStream");
    const payStream = PayStream.attach(PAYSTREAM_ADDRESS);

    const owner = await payStream.owner();
    console.log("Current Contract Owner:", owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
