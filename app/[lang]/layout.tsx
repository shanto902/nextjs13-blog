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
import { getDictionary } from "@/lib/getDictionary";
import { title } from "process";
import siteConfig from "@/config/site";
import NextTopLoader from "nextjs-toploader";

const banglaFont = localFont({ src: "../../fonts/SolaimanLipi.woff2" });

// const banglaFont = Baloo_Da_2({
//   subsets: ["latin"],
// });

export const englishFont = Open_Sans({
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "স্থাপত্য ও নির্মাণ | Sthapattyan O Nirman",
//   description: "",
// };

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: `%s | ${dictionary.metaData.title}`,
      default: dictionary.metaData.title,
    },
    description: dictionary.metaData.description,
    openGraph: {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
      title: dictionary.metaData.title,
      description: dictionary.metaData.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: dictionary.metaData.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "bn-BD": `${process.env.NEXT_PUBLIC_SITE_URL}/bn`,
      },
    },

    /* Verification for Google Search Console */
  };
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
        <NextTopLoader
          color="#b91c1c"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          shadow={false}
          speed={200}
        />
        {process.env.NEXT_PUBLIC_NODE_ENV === "test" ? (
          <PaddingContainer>
            <div className=" flex h-screen items-center justify-center flex-col gap-10">
              <Image
                className="mx-auto aspect-square pt-8"
                src={logo}
                alt="logo"
                width={120}
                height={120}
              />
              <h3 className=" text-center text-4xl leading-loose ">
                ‘স্থাপত্য ও নির্মাণ’ ওয়েবসাইটটি বর্তমানে নির্মাণাধীন অবস্থায়
                আছে। খুব শীঘ্রই ওয়েবসাইটটি নতুনভাবে প্রকাশিত হবে।
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
