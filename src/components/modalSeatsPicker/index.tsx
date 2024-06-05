'use client';

import { useRouter, useSearchParams, usePathname} from 'next/navigation';
import Link from 'next/link';

import styles from './index.module.css';
import { ChangeEvent, useState } from 'react';
import { formatDateAndTime } from '@/lib/formatDate';
import { TICKET_PRICE } from '@/constants';
import SeatsPickerForm from './seats-picker-form';
import { Movie, Showtime } from '@prisma/client';

interface ModalSeatsPickerProps {
  showtime: Showtime | null,
  movie: Movie | null,
}

export default function ModalSeatsPicker({ showtime, movie }: ModalSeatsPickerProps) {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  let date = showtime && formatDateAndTime(showtime!.date).split(' ').slice(0,2).join(' ');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSeats(prev => [...prev, value]);
    }else {
      setSelectedSeats(selectedSeats?.filter(seat => seat != value));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString())
    params.set('seats', selectedSeats.join(','));
    if (params.has('date')) params.delete('date');
    router.push(`/payment?${params.toString()}`);
  }

  return showtime && (
    <dialog className={styles.modal}>
      <div className={styles.content}>
        <Link href={pathname} className="float-right">
          <button type="button" className="bg-red-500 text-white p-3">⨯</button>
        </Link>
        <h3 className="text-center">{movie?.title.toUpperCase()}</h3>
        <time dateTime={showtime.date.toString()}>{date} {showtime.time}</time>
        <div className="flex flex-col items-center mt-10">
          <div className={styles.svg}>
            <svg viewBox="0 0 1440 320">
              <path
                fill="#ddd6cb"
                d="M0,160L120,138.7C240,117,480,75,720,74.7C960,75,1200,117,1320,
                  138.7L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
              ></path>
            </svg>
          </div>
          <div className={styles.screen}>Екран</div>
          <SeatsPickerForm
            availableSeats={JSON.parse(showtime.availableSeats as string)}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            disabled={selectedSeats.length <= 0}
          />
          {selectedSeats.length > 0 && (
            <div className={styles.summary}>
              <b>{selectedSeats.length} вибраних квитків:</b> {selectedSeats.join(', ')} <br />
              <b>Загальна сума:</b> {TICKET_PRICE * selectedSeats.length} грн
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};