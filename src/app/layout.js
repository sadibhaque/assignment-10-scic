import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
import { Toaster } from "../components/ui/sonner";
import ProductsInitializer from "../components/ProductsInitializer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "MyStore - Your One-Stop Shop",
    description:
        "Discover amazing products with our simple and secure shopping experience.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
            >
                <SessionProvider>
                    <ProductsInitializer />
                    {children}
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
