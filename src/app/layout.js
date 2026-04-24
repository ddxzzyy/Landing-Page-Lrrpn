import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LRRPN-BI SURABAYA",
  description: "Layanan Rehabilitasi Narkotika Nasional Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans min-h-full flex flex-col antialiased bg-white text-[#022E2F]`}
      >

        {/* CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        
      </body>
    </html>
  );
}