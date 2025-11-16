import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "جستجوی شامپو ووچه | دیجی‌کالا",
  description:
    "نمایش نتایج لحظه‌ای جستجوی شامپو ووچه از سایت دیجی‌کالا با استفاده از API عمومی.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
