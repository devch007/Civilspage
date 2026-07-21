import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Load Google Fonts using optimized Next.js variables
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
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
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col text-[#0F172A] selection:bg-[#4F46E5] selection:text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
