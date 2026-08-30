import type { Metadata } from 'next';
import { Merriweather, Source_Sans_3 } from 'next/font/google';
import './globals.css';

// Load Google Fonts using optimized Next.js variables
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.civilspage.com'),
  title: {
    default: 'CivilsPage - Master UPSC with Expert Guidance',
    template: '%s | CivilsPage',
  },
  description: 'Empowering the next generation of civil servants with structured study materials, direct expert strategies, and responsive learning interfaces.',
  keywords: 'UPSC, Civil Services Examination, IAS preparation, IPS exam, Rajiv Ranjan Singh, UPSC PYQs, Current Affairs, Governance, Ethics',
  authors: [{ name: 'Rajiv Ranjan Singh' }],
  creator: 'CivilsPage',
  publisher: 'CivilsPage',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.civilspage.com',
    siteName: 'CivilsPage',
    title: 'CivilsPage - Master UPSC with Expert Guidance',
    description: 'Empowering the next generation of civil servants with structured study materials, direct expert strategies, and responsive learning interfaces.',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 500,
        alt: 'CivilsPage Official Logo - Learn • Aspire • Achieve',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'CivilsPage - Master UPSC with Expert Guidance',
    description: 'Empowering the next generation of civil servants with structured study materials, direct expert strategies, and responsive learning interfaces.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

import JsonLdSchema from '@/components/seo/JsonLdSchema';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${sourceSans3.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <head>
        <JsonLdSchema />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GR0EKCQY7S"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-GR0EKCQY7S');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-[#0F172A] selection:bg-[#4F46E5] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
