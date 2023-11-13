import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/navigation/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const banglaFont = localFont({ src: "../../fonts/SolaimanLipi.woff2" });

// const banglaFont = Baloo_Da_2({
//   subsets: ["latin"],
// });

export const englishFont = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "স্থাপত্য ও নির্মাণ | Sthapattyan O Nirman",
  description: "",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang}>
      <body
        className={lang === "bn" ? banglaFont.className : englishFont.className}
      >
        <Navigation locale={lang} />
        <Suspense fallback={<Loading />}>
          <div className="pt-5 min-h-calc(100vh-300px)">{children}</div>
        </Suspense>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
