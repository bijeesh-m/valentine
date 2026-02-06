import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: "400",
  subsets: ["latin"],
});




export const metadata: Metadata = {
  title: "Will you be my Valentine?",
  description: "A special question for a special person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
