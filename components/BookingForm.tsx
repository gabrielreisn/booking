'use client';

import { useBooks } from '@/context/booking';
import { RangeCalendar } from './Calendar';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValid, set } from 'date-fns';
import * as z from 'zod';

type Inputs = {
  calendar: [Date, Date];
  tripName: string;
};

const schema = z.object({
  tripName: z.string().min(3, { message: 'You must provide a name for your vacation!' }),
  calendar: z.tuple([
    z.date().refine(isValid, { message: 'Check in time must be provided.' }),
    z.date().refine(isValid, { message: 'Check out time must be provided.' }),
  ]),
});

export function BookingForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const { addNewBooking } = useBooks();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { calendar, tripName } = data;

    const [checkIn, checkOut] = calendar;

    try {
      addNewBooking({
        checkIn,
        checkOut,
        destination: tripName,
      });
      reset();
    } catch (e: any) {
      setError('calendar', { type: 'custom', message: e.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 border rounded-lg p-4 lg:p-10 lg:min-w-[30rem]"
    >
      <div className="flex flex-col">
        <div className="flex justify-around">
          <label htmlFor="destination" className="block text-sm font-semibold leading-6 text-gray-900">
            Check In
          </label>
          <label htmlFor="destination" className="block text-sm font-semibold leading-6 text-gray-900">
            Check Out
          </label>
        </div>
        <Controller
          name="calendar"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <RangeCalendar {...field} />}
        />
        {errors.calendar && <p className="text-red-600 text-sm">{errors.calendar?.message}</p>}
      </div>
      <div>
        <label htmlFor="destination" className="block text-sm font-semibold leading-6 text-gray-900">
          Trip Name
        </label>
        <div className="mt-2.5">
          <input
            {...register('tripName', { required: true })}
            placeholder="what's the next destination?"
            type="text"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.tripName && <p className="text-red-600 text-sm">{errors.tripName?.message}</p>}
        </div>
      </div>
      <div className="mt-2.5">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Book your trip!
        </button>
      </div>
    </form>
  );
}
