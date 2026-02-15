# 🌊 PayStream (Reboot) on HeLa Chain

A decentralized real-time salary streaming application built on the HeLa Testnet. Employees receive their salary second-by-second and can withdraw at any time.

## ✨ Features

-   **Real-time Salary Streaming**: Earn every second.
-   **Gas Stipend**: Employers automatically cover the initial gas fees for employees.
-   **Tax Vault**: Automated tax deduction and separation.
-   **Employee Dashboard**: Track earnings, withdraw, and view analytics.
-   **HR Dashboard**: Manage employees, create streams, and send bonuses.
-   **Auto-Invest (Simulation)**: Employees can opt to "invest" a percentage of their salary into a staking pool.

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16+)
-   [MetaMask](https://metamask.io/) or HeLa Wallet extension.

### 1. Installation

Clone the repository and install dependencies for both the smart contracts and the frontend.

```bash
# Clone the repo
git clone <your-repo-url>
cd Paystream-reboot

# Install Contract Dependencies
cd contracts
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Environment Setup (Private Keys)

**⚠️ IMPORTANT:** Never commit your private keys to GitHub.

1.  Create a `.env` file in the `contracts/` directory.
2.  Add your wallet's private key (the one you will use to deploy contracts).

**File:** `contracts/.env`
```ini
PRIVATE_KEY=your_private_key_here_without_0x
```

> **How to get your Private Key:** Open MetaMask -> Three dots -> Account Details -> Show Private Key.

### 3. Smart Contract Deployment

Deploy the PayStream contract to the HeLa Testnet.

```bash
cd contracts
npx hardhat run scripts/deploy.js --network hela
```

*Note: If you run into issues, ensure you have some HLUSD in your wallet for gas.*

### 4. Frontend Setup

The frontend connects to the HeLa Testnet.

1.  Navigate to `frontend/`.
2.  Run the development server:

```bash
cd frontend
npm run dev
```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🦊 Metamask Setup (HeLa Testnet)

To use the application, you need to add the **HeLa Testnet** network to your MetaMask.

**Network Details:**

| Parameter | Value |
| :--- | :--- |
| **Network Name** | HeLa Official Runtime Testnet |
| **RPC URL** | `https://testnet-rpc.helachain.com` |
| **Chain ID** | `666888` (Hex: `0xA2D08`) |
| **Currency Symbol** | `HLUSD` |
| **Block Explorer** | `https://testnet-blockexplorer.helachain.com` |

*(The application will attempt to add this automatically when you click "Add HeLa Network" on the login screen.)*

---

## 📖 Usage Guide

### HR / Admin (The Employer)
1.  **Login**: Connect the wallet that deployed the contract (or deploy a new one via the UI).
2.  **Dashboard**:
    -   **Deposit**: Fund the Treasury with HLUSD.
    -   **Create Stream**: Enter Employee Address and Monthly Salary. *The system sends 1 HLUSD to the employee as a gas stipend.*
    -   **Monitor**: Pause/Resume streams.

### Employee
1.  **Login**: Connect your wallet.
2.  **Dashboard**:
    -   **Earnings**: Watch your salary accrue in real-time.
    -   **Withdraw**: Claim your salary. Tax is deducted automatically.
    -   **Invest/Off-ramp**: Simulate investing or cashing out.

---

## 🛠 Tech Stack

-   **Blockchain**: HeLa Chain (EVM Compatible)
-   **Smart Contracts**: Solidity, Hardhat
-   **Frontend**: Next.js (React), Tailwind CSS, Ethers.js v6

## 📄 License
MIT
"# Paystream_Full" 
