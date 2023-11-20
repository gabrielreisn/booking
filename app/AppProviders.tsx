'use client';

import { BooksProvider } from '@/context/booking';
import { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren<{}>) {
  return <BooksProvider>{children}</BooksProvider>;
}
