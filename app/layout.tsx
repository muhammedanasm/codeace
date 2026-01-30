import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import "../styles/custom.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// seo metadata
export const metadata: Metadata = {
  title: "Product Inventory | Admin Dashboard",
  description:
    "Manage your internal product listings, search, and filter efficiently.",
  keywords: ["Dashboard", "Product Management", "Inventory"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-[#f8fafc] antialiased">{children}</body>
    </html>
  );
}
