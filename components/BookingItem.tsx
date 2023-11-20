'use client';
import { useState } from 'react';
import { RangeCalendar } from './Calendar';
import { EditIcon } from '@/Icons/Edit';
import { TrashIcon } from '@/Icons/Trash';

export function BookingItem() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="flex p-3 border rounded-lg gap-4">
      <RangeCalendar disabled={!isEditing} />
      <button onClick={() => setIsEditing(true)}>
        <EditIcon />
      </button>
      <button>
        <TrashIcon />
      </button>
    </section>
  );
}
