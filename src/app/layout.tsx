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
    <html lang="en">
      <body className="dark:bg-white">
        <ThemeProvider>
          <header className="flex px-6 py-4 justify-between  dark:bg-red-900">
            <h1 className="text-4xl">Cookie Clicker</h1>
            <ModeToggle />
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
