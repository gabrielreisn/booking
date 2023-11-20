import { Booking } from '@/schema';
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

type BookContextType = {
  bookings: Record<string, Booking>;
  addNewBooking: (book: Booking) => void;
  deleteBooking: (id: string) => void;
  updateBooking: (id: string, book: Booking) => void;
  getBookingKey(startDate: Date, endDate: Date): string;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BooksProvider({ children }: PropsWithChildren<{}>) {
  const [bookings, setBookings] = useState<BookContextType['bookings']>({});

  function getBookingKey(startDate: Date, endDate: Date) {
    const startKey = `${startDate.getFullYear()}${startDate.getMonth()}${startDate.getDay()}`;
    const endKey = `${endDate.getFullYear()}${endDate.getMonth()}${endDate.getDay()}`;

    return `${startKey}/${endKey}`;
  }

  const addNewBooking = useCallback(
    (book: Booking) => {
      const bookKey = getBookingKey(book.startDate, book.endDate);

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

  const deleteBooking = useCallback(
    (id: string) => {
      if (id in bookings) {
        const clonedBookings = structuredClone(bookings);

        delete clonedBookings[id];

        setBookings(clonedBookings);

        return;
      }

      throw new Error('Booking does not exist');
    },
    [bookings]
  );

  const updateBooking = useCallback(
    (id: string, book: Booking) => {
      if (id in bookings) {
        setBookings((prevBookings) => ({
          ...prevBookings,
          [id]: { ...prevBookings[id], ...book },
        }));

        return;
      }

      throw new Error('Booking does not exist');
    },
    [bookings]
  );

  const value = useMemo(
    () => ({ bookings, addNewBooking, getBookingKey, deleteBooking, updateBooking }),
    [bookings, addNewBooking, deleteBooking, updateBooking]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }

  return context;
}
