import { Roboto } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Notion clone",
    description: "Notion clone created by AkobirCoder",
    icons: {
        icon: '/logo.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${roboto.variable} h-full`}>
            <body>{children}</body>
        </html>
    );
}