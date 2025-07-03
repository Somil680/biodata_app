import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BiodataProvider } from "@/context/BiodataContext";
import { PreviewModalProvider } from "@/context/PreviewModalContext";
import PreviewModal from "@/components/Model/PreviewModal";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BiodataMaker - Create Beautiful Matrimonial Biodatas",
  description: "Design beautiful, culturally rich matrimonial biodatas that perfectly blend tradition with modernity. Easily customizable, instantly downloadable.",
  keywords: ["biodata", "matrimonial", "marriage", "profile", "wedding", "bride", "groom"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <BiodataProvider>
          <PreviewModalProvider>
            {/* ... */}
            {children}
            <PreviewModal />
            {/* ... */}
          </PreviewModalProvider>
        </BiodataProvider>
      </body>
    </html>
  )
}
