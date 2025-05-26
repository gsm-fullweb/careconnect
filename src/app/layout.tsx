import "@/app/globals.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareConnect - Cuidadores de Idosos",
  description: "Conectando cuidado a quem precisa ser cuidado. Encontre cuidadores de idosos qualificados e de confiança para sua família.",
  keywords: "cuidadores de idosos, home care, assistência à idosos, cuidador de idosos, Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
