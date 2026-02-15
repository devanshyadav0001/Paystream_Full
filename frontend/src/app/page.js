import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
            {/* Background decorations */}
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: "var(--accent-glow)" }}></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: "var(--accent-glow)" }}></div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-primary)" }}>
                <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">💰</span>
                        <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>PayStream</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full ml-2 font-medium" style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent-light)" }}>
                            HeLa Network
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-24">
                <div className="text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs mb-8 font-medium"
                        style={{ background: "var(--accent-light)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: "var(--success)" }}></span>
                        Powered by HLUSD Stablecoin
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
                        Salary Streaming
                        <br />
                        <span style={{ color: "var(--accent)" }}>Real-Time.</span>
                    </h1>

                    <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
                        Stream salaries to employees by the second. No more waiting for payday.
                        Powered by HeLa blockchain.
                    </p>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
                        style={{ background: "var(--gradient-accent)", color: "var(--text-inverse)", boxShadow: "var(--shadow-lg)" }}
                    >
                        Get Started →
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full pb-12">
                    <div className="glass-card p-6">
                        <div className="text-2xl mb-4">⚡</div>
                        <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>HR Dashboard</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            Deposit funds, create salary streams, monitor employees, and manage tax vault.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="text-2xl mb-4">🛡️</div>
                        <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Automated Tax</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            Tax is automatically deducted on every withdrawal and stored securely on-chain.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="text-2xl mb-4">⏱️</div>
                        <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Live Earnings</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            Watch your salary grow every second. Withdraw whenever you want.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
