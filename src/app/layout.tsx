import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import { ModeToggle } from "@/components/dark-modetoggle";
export const metadata: Metadata = {
  title: "Cookie Clicker",
  description: "Cookie Clicker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.className}>
      <body className="max-h-screen flex flex-col">
        <ThemeProvider>
          <header className="flex px-6 h-20 py-4 justify-between bg-orange-300  dark:bg-red-700">
            <h1 className="text-4xl">Cookie Clicker</h1>
            <ModeToggle />
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
