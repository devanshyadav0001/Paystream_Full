import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
    title: "PayStream - Salary Streaming",
    description: "Real-time salary streaming on HeLa Network",
};

export default function RootLayout({ children }) {
    console.log("Rendering RootLayout");
    return (
        <html lang="en">
            <body className={`${inter.className} ${playfair.variable}`}>{children}</body>
        </html>
    );
}
