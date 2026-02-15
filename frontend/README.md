# PayStream Frontend 💸

This is the frontend application for PayStream, a decentralized salary streaming platform on the HeLa blockchain.

## 🚀 Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001/3002 if 3000 is busy).

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🔧 Configuration

- **Contract Address**: Connects to PayStream on HeLa Testnet at `0x4C2F7092C2aE51D986bEFEe378e50BD4dB99C901`.
- **Network**: Automatically prompts to add/switch to HeLa Testnet (Chain ID 666888).
- **Styling**: Tailwind CSS with custom variables for theming.

## 📂 Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Reusable UI components
- `src/hooks`: React hooks
- `src/utils`: Contract interaction logic (`contract.js`)

---

## 📝 Notes for Hackathon Judges

To test the application:
1. Ensure you have **MetaMask** installed.
2. Connect to **HeLa Testnet**.
3. Use the **HR Dashboard** to deposit funds and create streams.
4. Use the **Employee Dashboard** to see real-time earnings and withdraw.
