import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import logo from "@/assets/logo.svg";
import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/navigation/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";

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
        {process.env.NEXT_PUBLIC_NODE_ENV === "test" ? (
          <PaddingContainer>
            <div className=" flex h-screen items-center justify-center flex-col gap-10">
              <Image
                className="mx-auto aspect-square pt-8 hidden lg:block"
                src={logo}
                alt="logo"
                width={120}
                height={120}
              />
              <h3 className=" text-center text-4xl leading-loose ">
                ‘স্থাপত্য ও নির্মাণ’ ওয়েবসাইটটি বর্তমানে নির্মাণাধীন অবস্থায়
                আছে। খুবখুব শীঘ্রই ওয়েবসাইটটি নতুনভাবে প্রকাশিত হবে।
              </h3>
            </div>
          </PaddingContainer>
        ) : (
          <>
            <Navigation locale={lang} />
            <Suspense fallback={<Loading />}>
              <div className="pt-5 min-h-calc(100vh-300px)">{children}</div>
            </Suspense>
            <Footer locale={lang} />
          </>
        )}
      </body>
    </html>
  );
}
