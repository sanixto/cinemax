'use client';
import { useFormState, useFormStatus } from 'react-dom';
import styles from './seats-picker-form.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface SeatsPickerForm {
  availableSeats: boolean[][],
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  action: (prevState: { bookingId: string }, formData: FormData) => Promise<{ bookingId: string }>,
  disabled: boolean,
}

export default function SeatsPickerForm({ availableSeats, handleChange, action, disabled }: SeatsPickerForm) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, {bookingId: '' });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.bookingId) {
      router.push(`/payment/${state.bookingId}`);
    }
  }, [state.bookingId, router]);

  return (
    <form className={styles.hall} action={formAction}>
      {availableSeats?.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`} className={styles.row}>
            {row.map((seat, seatIndex) => (
              <input
                key={`seat-${rowIndex}-${seatIndex}`}
                className={seat ? styles.seat : `${styles.seat} ${styles.booked}`}
                type="checkbox"
                value={`${rowIndex+1}${seatIndex}`}
                onChange={handleChange}
                title={seat ? `Місце ${rowIndex+1}${seatIndex}` : 'Заброньовано'}
                disabled={!seat}
              />
            ))}
          </div>
        );
      })}
      <div className="flex justify-center">
        <button type="submit" disabled={disabled}>
          {pending ? 'Завантаження...' : 'Далі' }
        </button>
      </div>
    </form>
  );
}