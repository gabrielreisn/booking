'use client';
import { BookingForm } from '@/components/BookingForm';
import { BookingItem } from '@/components/BookingItem';
import { useBooks } from '@/context/booking';

export default function Home() {
  const { bookings } = useBooks();

  return (
    <main className="p-4 w-full lg:max-w-3xl lg:p-24">
      <BookingForm />
      {Object.values(bookings).map((booking, i) => (
        <BookingItem key={i} />
      ))}
    </main>
  );
}
