import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "PayStream - Salary Streaming",
    description: "Real-time salary streaming on HeLa Network",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            try {
                                var t = localStorage.getItem('paystream-theme');
                                if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
                            } catch(e) {}
                        })();
                    `
                }} />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
