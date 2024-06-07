import styles from './page.module.css';
import { updatePaymentStatus } from '@/actions/bookings';
import PaymentForm from '@/components/payment-form';
import { getBooking } from '@/lib/booking';
import { getMovie } from '@/lib/movies';
import { getShowtime } from '@/lib/showtimes';
import { Booking, Movie, Showtime } from '@prisma/client';
import { notFound } from 'next/navigation';

interface PaymentPageProps {
  params: {
    paymentSlug: string,
  },
}

export default async function PaymenPage({ params }: PaymentPageProps) {
  const { paymentSlug } = params;

  const booking: Booking | null = await getBooking(paymentSlug);

  if (!booking) notFound();

  const showtime: Showtime | null = await getShowtime(booking.showtimeId);
  if (!showtime) throw new Error('Something went wrong');
  const movie: Movie | null = await getMovie(showtime.movieId);

  return (
    <main className="p-5 lg:px-10">
      <article className={`${styles.article} w-full md:w-3/4 lg:w-2/3 xl:w-1/2`} >
        <section>
            <h2>{movie?.title.toUpperCase()}</h2>
            <time dateTime={showtime.date.toString()} >
            {showtime.date.toLocaleDateString()}
            </time>
        </section>
        <PaymentForm
            price={booking.price}
            action={updatePaymentStatus.bind(undefined, booking)}
        />
      </article>
    </main>
  );
}