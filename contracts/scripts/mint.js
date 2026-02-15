const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const hrAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    const token = await hre.ethers.getContractAt("MockERC20", tokenAddress);

    // Mint 100,000 HLUSD to HR account
    const amount = hre.ethers.parseUnits("100000", 18);
    const tx = await token.mint(hrAddress, amount);
    await tx.wait();

    const balance = await token.balanceOf(hrAddress);
    console.log(`✅ Minted 100,000 HLUSD to HR account`);
    console.log(`   Address: ${hrAddress}`);
    console.log(`   Balance: ${hre.ethers.formatUnits(balance, 18)} HLUSD`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
