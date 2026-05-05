import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Стратегії та рішення громад",
  description:
    "Аналітичний дашборд для аналізу рішень місцевих рад, стратегій розвитку та досягнень громад.",
  keywords: [
    "громади",
    "аналітика",
    "рішення місцевих рад",
    "стратегії розвитку",
    "civic tech",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="header">
          <Link href="/" className="logo">
            <Image
              src="/logo-new.png"
              alt="Стратегії громад"
              width={48}
              height={48}
              className="logoImage"
            />
            <span>Стратегії громад</span>
          </Link>

          <nav className="nav">
            <Link href="/">Головна</Link>
            <Link href="/compare">Порівняння</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
