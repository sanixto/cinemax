import { getSession, Session } from '@auth0/nextjs-auth0';

import styles from './page.module.css';
import Auth0User from '@/interfaces/auth0User.interface';
import { getUserByEmail } from '@/lib/users';
import { User } from '@prisma/client';
import { deleteBooking, getBookings } from '@/lib/booking';
import { getShowtime } from '@/lib/showtimes';
import { getMovie } from '@/lib/movies';
import { getReviews } from '@/lib/reviews';
import UserInfo from '@/components/profile/user-info';
import UserBooking from '@/components/profile/user-booking';

export default async function Profile() {
  const session: Session | null | undefined = await getSession();
  let user: User | null = null;
  if (session && session.user) {
    const auth0User = session.user as Auth0User;
    try {
      user = await getUserByEmail(auth0User.email);
    } catch(e) {
      console.log(e);
    }
  }

  if (!user) throw new Error('401 Unuthorized');

  const bookings = await getBookings(user.id);
  const reviews = await getReviews({ userId: user.id });

  return (
    <main className="p-10 lg:px-10 xl:px-60">
      <article className={styles.article}>
        <button>Редагувати профіль</button>
        <h2>Мій профіль</h2>
        <UserInfo user={user} amountOfReviews={reviews?.length ?? 0} />
      </article>
      <article className={styles.article}>
        <h2>Мої бронювання({bookings?.length})</h2>
          {bookings?.map(async booking => {
            const showtime = await getShowtime(booking.showtimeId);
            const movie = await getMovie(showtime!.movieId);
            return <UserBooking
              key={booking.id}
              booking={booking}
              movie={movie!}
              showtime={showtime!}
              />
          })}
      </article>
    </main>
  );
}
