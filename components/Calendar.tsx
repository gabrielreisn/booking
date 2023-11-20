'use client';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import { Ref, createRef, forwardRef, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  disabled?: boolean;
  startDate?: Date;
  endDate?: Date;
  className?: string;
};

function RangeCalendar(props: Props, ref: Ref<HTMLDivElement>) {
  const { disabled = false, startDate = null, endDate = null, className, ...otherProps } = props;
  const [value, onChange] = useState<Value>([startDate, endDate]);

  // Forward the ref to the DateRangePicker component
  const dateRangePickerRef = ref || createRef();

  return (
    <DateRangePicker
      className={className}
      locale="pt-BR"
      inputRef={dateRangePickerRef}
      showLeadingZeros
      closeCalendar
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

export default forwardRef(RangeCalendar);
