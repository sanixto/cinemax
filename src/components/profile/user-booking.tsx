import Image from 'next/image';
import Link from 'next/link';

import styles from './user-bookings.module.css';
import { Booking, Movie, Showtime } from '@prisma/client';
import { formatDateAndTime } from '@/lib/formatDate';


interface UserBookingsProps {
  booking: Booking,
  movie: Movie,
  showtime: Showtime,
}

export default function UserBooking({ booking, movie, showtime }: UserBookingsProps) {
  return (
    <section className={styles.section}>
      <div>
        <div className={styles.img}>
          <Image src={movie!.imageUrl} alt={movie!.title} priority fill />
        </div>
        <div className={styles.info}>
          <h3>{movie?.title}</h3>
          <ul>
            <li>
              <b>Дата і час сеансу: </b>
              <time dateTime={showtime!.date.toString()}>
              {formatDateAndTime(showtime!.date)}
              </time>
            </li>
            <li>
              <b>Ціна: </b>{booking.price}
            </li>
            <li>
              <b>Місця в залі: </b>{booking.seats.join(', ')}
            </li>
            <li>
              <b>Статус оплати: </b>{booking.isPayed ? 'Оплачено' : 'Не оплачено'}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.buttons}>
        {!booking.isPayed && (
          <Link href={`/payment/${booking.id}`}>
              Оплатити
          </Link>
        )}
        <div><button>Скасувати бронювання</button></div>
      </div>
    </section>
  )
}