'use client';
import { useState } from 'react';
import RangeCalendar from './Calendar';
import { EditIcon } from '@/Icons/Edit';
import { TrashIcon } from '@/Icons/Trash';
import { Booking, BookingFormInputs, bookingFormSchema } from '@/schema';
import { useBooks } from '@/context/booking';
import { ClearIcon } from '@/Icons/Clear';
import { CheckIcon } from '@/Icons/Check';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Props = Pick<Booking, 'destination' | 'endDate' | 'startDate'>;

export function BookingItem({ startDate, endDate, destination }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const { deleteBooking, getBookingKey, updateBooking } = useBooks();

  const { register, handleSubmit, control, setError, reset } = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      calendar: [startDate, endDate],
      tripName: destination,
    },
  });
  const key = getBookingKey(startDate, endDate);

  function deleteBook() {
    deleteBooking(key);
  }

  function discardEditing() {
    setIsEditing(false);
    reset();
  }

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    const { calendar, tripName } = data;

    const [startDate, endDate] = calendar;

    try {
      updateBooking(key, {
        startDate,
        endDate,
        destination: tripName,
      });
      setIsEditing(false);
    } catch (e: any) {
      setError('calendar', { type: 'custom', message: e.message });
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex p-3 border rounded-lg gap-4 md:items-center mt-4 flex-col md:flex-row items-start">
          <div className="flex w-full">
            <Controller
              name="calendar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <RangeCalendar {...field} />}
            />
            <div className="md:hidden flex items-center ml-auto">
              <button className="mr-4" type="submit">
                <CheckIcon />
              </button>
              <button onClick={discardEditing}>
                <ClearIcon />
              </button>
            </div>
          </div>
          <input
            {...register('tripName', { required: true })}
            placeholder="what's the next destination?"
            type="text"
            className="block w-full md:w-md flex-grow rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="ml-auto hidden md:flex">
            <button className="mr-4" type="submit">
              <CheckIcon />
            </button>
            <button onClick={discardEditing}>
              <ClearIcon />
            </button>
          </div>
        </section>
      </form>
    );
  }

  return (
    <section className="flex p-3 border rounded-lg gap-4 items-center mt-4">
      <RangeCalendar disabled startDate={startDate} endDate={endDate} />
      <p className="truncate">{destination}</p>
      <div className="ml-auto flex">
        <button onClick={() => setIsEditing(true)} className="mr-4">
          <EditIcon />
        </button>
        <button onClick={deleteBook}>
          <TrashIcon />
        </button>
      </div>
    </section>
  );
}
