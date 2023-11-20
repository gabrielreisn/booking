'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from './AppProviders';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <section className="flex flex-col justify-between items-center">{children}</section>
        </AppProviders>
      </body>
    </html>
  );
}
