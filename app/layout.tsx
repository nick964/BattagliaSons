import type { Metadata } from "next";
import { Lato, Lora } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Battaglia & Sons Electric | Electrical Services in the Tri-State Area",
  description:
    "Expert electrical solutions across Philadelphia, New Jersey, and Delaware. Repairs, installations, and upgrades with precision and care. Call 267-693-3125.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
