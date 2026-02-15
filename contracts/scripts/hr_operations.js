const hre = require("hardhat");

const PAYSTREAM_ADDRESS = "0x99dBE4AEa58E518C50a1c04aE9b48C9F6354612f";

async function main() {
    const action = process.env.ACTION;
    const [signer] = await hre.ethers.getSigners();
    const PayStream = await hre.ethers.getContractFactory("PayStream");
    const contract = PayStream.attach(PAYSTREAM_ADDRESS).connect(signer);

    console.log("=== PayStream HR Operations ===");
    console.log("Wallet:", signer.address);
    console.log("Action:", action);
    console.log("");

    if (action === "deposit") {
        // ─── DEPOSIT HLUSD ───
        const amount = process.env.AMOUNT || "10";
        const value = hre.ethers.parseEther(amount);
        console.log(`Depositing ${amount} HLUSD...`);
        const tx = await contract.deposit({ value });
        console.log("TX Hash:", tx.hash);
        await tx.wait();
        console.log("✅ Deposit successful!");

    } else if (action === "create_stream") {
        // ─── CREATE STREAM ───
        const employee = process.env.EMPLOYEE;
        const rate = process.env.RATE || "0.001"; // HLUSD per second
        if (!employee) {
            console.error("❌ Set EMPLOYEE=<address>");
            return;
        }
        const rateWei = hre.ethers.parseEther(rate);
        console.log(`Creating stream for ${employee} at ${rate} HLUSD/sec...`);
        const tx = await contract.createStream(employee, rateWei);
        console.log("TX Hash:", tx.hash);
        await tx.wait();
        console.log("✅ Stream created!");

    } else if (action === "pause_stream") {
        const employee = process.env.EMPLOYEE;
        if (!employee) { console.error("❌ Set EMPLOYEE=<address>"); return; }
        console.log(`Pausing stream for ${employee}...`);
        const tx = await contract.pauseStream(employee);
        await tx.wait();
        console.log("✅ Stream paused!");

    } else if (action === "resume_stream") {
        const employee = process.env.EMPLOYEE;
        if (!employee) { console.error("❌ Set EMPLOYEE=<address>"); return; }
        console.log(`Resuming stream for ${employee}...`);
        const tx = await contract.resumeStream(employee);
        await tx.wait();
        console.log("✅ Stream resumed!");

    } else if (action === "cancel_stream") {
        const employee = process.env.EMPLOYEE;
        if (!employee) { console.error("❌ Set EMPLOYEE=<address>"); return; }
        console.log(`Cancelling stream for ${employee}...`);
        const tx = await contract.cancelStream(employee);
        await tx.wait();
        console.log("✅ Stream cancelled!");

    } else if (action === "bonus") {
        const employee = process.env.EMPLOYEE;
        const amount = process.env.AMOUNT || "1";
        if (!employee) { console.error("❌ Set EMPLOYEE=<address>"); return; }
        const value = hre.ethers.parseEther(amount);
        console.log(`Sending ${amount} HLUSD bonus to ${employee}...`);
        const tx = await contract.sendBonus(employee, { value });
        await tx.wait();
        console.log("✅ Bonus sent!");

    } else if (action === "status") {
        // ─── CHECK CONTRACT STATUS ───
        const owner = await contract.owner();
        const balance = await hre.ethers.provider.getBalance(PAYSTREAM_ADDRESS);
        console.log("Contract Owner:", owner);
        console.log("Treasury Balance:", hre.ethers.formatEther(balance), "HLUSD");

        // Check if employee address provided
        const employee = process.env.EMPLOYEE;
        if (employee) {
            try {
                const stream = await contract.streams(employee);
                console.log("\n--- Employee Stream ---");
                console.log("Rate:", hre.ethers.formatEther(stream.ratePerSecond), "HLUSD/sec");
                console.log("Active:", stream.isActive);
                console.log("Start:", new Date(Number(stream.startTime) * 1000).toLocaleString());
            } catch (e) {
                console.log("No stream found for", employee);
            }
        }

    } else {
        console.log("Available actions:");
        console.log("  ACTION=deposit AMOUNT=10");
        console.log("  ACTION=create_stream EMPLOYEE=0x... RATE=0.001");
        console.log("  ACTION=pause_stream EMPLOYEE=0x...");
        console.log("  ACTION=resume_stream EMPLOYEE=0x...");
        console.log("  ACTION=cancel_stream EMPLOYEE=0x...");
        console.log("  ACTION=bonus EMPLOYEE=0x... AMOUNT=1");
        console.log("  ACTION=status [EMPLOYEE=0x...]");
        console.log("");
        console.log("Example:");
        console.log('  set ACTION=deposit&& set AMOUNT=10&& npx hardhat run scripts/hr_operations.js --network hela');
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
