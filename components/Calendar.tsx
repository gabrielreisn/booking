'use client';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  disabled?: boolean;
};

export function RangeCalendar(props: Props) {
  const { disabled = false, ...otherProps } = props;
  const [value, onChange] = useState<Value>([null, null]);

  return (
    <DateRangePicker
      autoFocus
      onChange={onChange}
      value={value}
      maxDetail="month"
      minDetail="month"
      minDate={new Date()}
      rangeDivider=" ・ "
      clearIcon={null}
      calendarIcon={null}
      disabled={disabled}
      nextLabel={'→'}
      next2Label={'»'}
      prevLabel={'←'}
      prev2Label={'«'}
      {...otherProps}
    />
  );
}
