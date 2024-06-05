import { notFound } from 'next/navigation';

import { createReview } from '@/actions/reviews';
import ModalSeatsPicker from '@/components/modalSeatsPicker';
import MovieDetails from '@/components/movie-details';
import ShowtimePicker from '@/components/movie-details/showtime-picker';
import Reviews from '@/components/reviews';
import { getMovie } from '@/lib/movies';
import { getReviews } from '@/lib/reviews';
import { getShowtime, getShowtimes } from '@/lib/showtimes';
import { getUser } from '@/lib/users';
import { Movie, Review, Showtime, User } from '@prisma/client';

interface MealDetailsPage {
  params: {
    movieSlug: string,
  },
  searchParams: {
    date?: string,
    showtimeId?: string,
  }
}

export default async function MealDetailsPage({ params, searchParams }: MealDetailsPage) {
  const selectedDateStr: string | undefined = searchParams?.date;
  const date = selectedDateStr ? new Date(selectedDateStr) : new Date();
  const showtimeId: string | undefined = searchParams?.showtimeId;

  const movie: Movie | null = await getMovie(params.movieSlug);

  if (!movie) notFound();

  let showtime: Showtime | null = null;
  if (showtimeId) showtime = await getShowtime(showtimeId);

  const showtimes: Showtime[] = await getShowtimes(movie.id, date) ?? [];
  const reviews: Review[] = await getReviews(movie.id) ?? [];
  const usersWithUndefined: (User | undefined)[] = await Promise.all(reviews.map(async (review) => {
    const reviewer: User | null = await getUser(review.userId);
    if (reviewer) return reviewer;
  }));
  const users: User[] = usersWithUndefined.filter((user): user is User => user !== undefined);

  return (
    <main className="p-5 lg:px-10">
      <MovieDetails movie={movie} />
      <ShowtimePicker showtimes={showtimes} />
      <ModalSeatsPicker showtime={showtime} movie={movie}/>
      <Reviews reviews={reviews} reviewers={users} action={createReview.bind(undefined, movie.id)} />
    </main>
  );
}