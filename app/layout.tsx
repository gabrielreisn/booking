'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { BooksProvider } from '@/context/booking';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BooksProvider>
          <section className="flex flex-col justify-between items-center">{children}</section>
        </BooksProvider>
      </body>
    </html>
  );
}
