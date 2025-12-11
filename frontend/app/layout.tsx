import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Asset Dashboard",
  description: "Asset management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

