import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteMeta } from "@/content/site";
import {
  buildMetadata,
  personJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd,
  siteNavigationJsonLd,
} from "@/lib/seo";
import { SiteChrome } from "@/components/shared/site-chrome";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";

// Self-hosted rather than next/font/google: the Google loader fetches the
// font during the build, and on Cloudflare's builders that fetch broke the
// whole build. The file is the variable latin subset Google serves (one file
// covers every weight), so the rendered font is unchanged.
const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  ...buildMetadata({}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) — must load first, per Google's own setup
            instructions. Only renders when NEXT_PUBLIC_GA_ID is configured,
            so local/preview builds without an ID stay silent. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        {/* Pre-paint flag: `js` gates the scroll-reveal animations, so a no-JS
            visitor always gets the fully-visible content. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){document.documentElement.classList.add('js')})()",
          }}
        />
      </head>
      {/* suppressHydrationWarning: some antivirus/ad-blocking browser
          extensions (e.g. Bitdefender) inject a `bis_skin_checked` attribute
          into the live DOM before React hydrates, which otherwise trips a
          false-positive hydration mismatch warning that has nothing to do
          with actual app state. */}
      <body className="antialiased" suppressHydrationWarning>
        <SiteChrome floatingCta={<WhatsAppFloat />}>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
