# 🌊 PayStream (Reboot) on HeLa Chain

**🚀 Live Demo:** [https://paystream-bc929.web.app](https://paystream-bc929.web.app)

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

## 📖 User Guide: How to Get Started

### 🏢 For HR Managers (Employers)

**Step 1: Connect & Authenticate**
1.  Open [PayStream](https://paystream-bc929.web.app).
2.  Click **"Connect Wallet"** (Use MetaMask with HeLa Testnet).
3.  Select **"HR / Admin"** role.

**Step 2: Deploy Your Organization Contract**
*   *First Time User?* The app will ask if you have an existing contract.
*   Click **"No, Deploy New Contract"**.
*   Confirm the transaction in MetaMask. (Cost: ~0.05 HLUSD).
*   **Save your Contract Address!** (The app remembers it, but keep a copy).

**Step 3: Fund & Stream**
1.  **Fund Treasury**: Go to the **Deposit** tab and add HLUSD to your contract to cover salaries.
2.  **Add Employee**: Go to **Create Stream**.
    *   Enter User Wallet Address.
    *   Set Monthly Salary (e.g., 5000 HLUSD).
    *   Click **Create**. (This automatically sends 1 HLUSD as a *Gas Stipend* to the employee).

---

### 👤 For Employees

**Step 1:Get Onboarded**
*   Share your wallet address with your HR manager.
*   Wait for them to create your stream. You will receive **1 HLUSD** automatically for gas fees.

**Step 2: Access Dashboard**
1.  Open [PayStream](https://paystream-bc929.web.app).
2.  Click **"Connect Wallet"**.
3.  Select **"Employee"** role.
4.  *First Time?* Enter the **Organization Contract Address** provided by HR (or asked them to share it).

**Step 3: Manage Salary**
*   **Watch it Grow**: See your earnings increase every second.
*   **Withdraw**: Click **"Withdraw"** to claim your accumulated HLUSD.
*   **History**: Check the **"History"** tab for a log of all payments and bonuses.

---

## 🛠 Tech Stack

-   **Blockchain**: HeLa Chain (EVM Compatible)
-   **Smart Contracts**: Solidity, Hardhat
-   **Frontend**: Next.js (React), Tailwind CSS, Ethers.js v6

## 📄 License
MIT
