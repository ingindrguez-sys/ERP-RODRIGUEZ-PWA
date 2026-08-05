import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthGate from "@/components/AuthGate";
import Shell from "@/components/Shell";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: "ERP Rodríguez",
  description: "Centro de Control Empresarial",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "ERP Rodríguez",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7b1118",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <PwaRegister />
        <AuthGate>
          <Shell>{children}</Shell>
        </AuthGate>
      </body>
    </html>
  );
}
