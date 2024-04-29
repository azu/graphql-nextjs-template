import "./globals.css";
import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo/ApolloWrapper";

export const metadata: Metadata = {
    title: "App",
    description: "App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body><ApolloWrapper>{children}</ApolloWrapper></body>
        </html>
    );
}
