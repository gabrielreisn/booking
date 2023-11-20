import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

const defaultState = {
  bookings: [],
} as const;

const BookContext = createContext([] as any);

export function BookProvider({ children }: PropsWithChildren<{}>) {
  const [bookings, setBookings] = useState([]);

  const value = useMemo(() => ({ bookings, setBookings }), [bookings]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }

  return context;
}
