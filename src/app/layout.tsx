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
  title: 'CivilsPage - Master UPSC with Expert Guidance',
  description: 'Empowering the next generation of civil servants with structured study materials, direct expert strategies, and responsive learning interfaces.',
  keywords: 'UPSC, Civil Services Examination, IAS preparation, IPS exam, Rajiv Ranjan Singh, UPSC PYQs, Current Affairs',
};

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
      <body className="min-h-full flex flex-col text-[#0F172A] selection:bg-[#4F46E5] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
