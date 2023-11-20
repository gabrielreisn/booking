
import * as z from 'zod';
import { isValid } from 'date-fns';

export type Booking = {
  destination: string;
  startDate: Date;
  endDate: Date;
};

export type BookingFormInputs = {
  calendar: [Date, Date];
  tripName: string;
};

export const bookingFormSchema = z.object({
  tripName: z.string().min(3, { message: 'You must provide a name for your vacation!' }),
  calendar: z.tuple([
    z.date().refine(isValid, { message: 'Check in time must be provided.' }),
    z.date().refine(isValid, { message: 'Check out time must be provided.' }),
  ]),
});