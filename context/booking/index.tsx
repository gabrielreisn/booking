import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

type Booking = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
};

type BookContextType = {
  bookings: Record<string, Booking>;
  addNewBooking: (book: Booking) => void;
  getBookingKey(startDate: Date, endDate: Date): string;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BooksProvider({ children }: PropsWithChildren<{}>) {
  const [bookings, setBookings] = useState<BookContextType['bookings']>({});

  function getBookingKey(startDate: Date, endDate: Date) {
    const startKey = startDate.getFullYear() + startDate.getMonth() + startDate.getDay();
    const endKey = endDate.getFullYear() + endDate.getMonth() + endDate.getDay();

    return `${startKey}/${endKey}`;
  }

  const addNewBooking = useCallback(
    (book: Booking) => {
      const bookKey = getBookingKey(book.checkIn, book.checkOut);

      if (bookKey in bookings) {
        throw new Error('Date is already booked for another appointment');
      }

      setBookings((prev) => ({
        ...prev,
        [bookKey]: book,
      }));
    },
    [bookings]
  );

  const value = useMemo(() => ({ bookings, addNewBooking, getBookingKey }), [bookings, addNewBooking]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }

  return context;
}
