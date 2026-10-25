import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Для Лізочки ♡",
  description:
    "Маленький особливий світ, створений з любов'ю для тебе.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}