import { notFound } from 'next/navigation';

import { createReview } from '@/actions/reviews';
import ModalSeatsPicker from '@/components/modalSeatsPicker';
import MovieDetails from '@/components/movie-details';
import ShowtimePicker from '@/components/showtime-picker';
import Reviews from '@/components/reviews';
import { getMovie } from '@/lib/movies';
import { getReviews } from '@/lib/reviews';
import { getShowtime, getShowtimes } from '@/lib/showtimes';
import { getUser } from '@/lib/users';
import { Movie, Review, Showtime, User } from '@prisma/client';
import { createBooking } from '@/actions/bookings';
import Head from 'next/head';
import { Metadata } from 'next';

export async function generateMetadata({ params }: MovieDetailsPageProps): Promise<Metadata> {
  const movie: Movie | null = await getMovie(params.movieSlug);

  return {
    title: `${movie?.title.toUpperCase()} | Cinemax`,
    description: `Перегляньте інформацію про фільм ${movie?.title}, включаючи опис, дату виходу, режисера та жанр.`,
  }
}

interface MovieDetailsPageProps {
  params: {
    movieSlug: string,
  },
  searchParams: {
    date?: string,
    showtimeId?: string,
  }
}

export default async function MovieDetailsPage({ params, searchParams }: MovieDetailsPageProps) {
  const selectedDateStr: string | undefined = searchParams?.date;
  const date = selectedDateStr ? new Date(selectedDateStr) : new Date();
  const showtimeId: string | undefined = searchParams?.showtimeId;

  const movie: Movie | null = await getMovie(params.movieSlug);

  if (!movie) notFound();

  let showtime: Showtime | null = null;
  if (showtimeId) showtime = await getShowtime(showtimeId);

  const showtimes: Showtime[] = await getShowtimes(movie.id, date) ?? [];
  const reviews: Review[] = await getReviews({ movieId: movie.id }) ?? [];
  const usersWithUndefined: (User | undefined)[] = await Promise.all(reviews.map(async (review) => {
    const reviewer: User | null = await getUser(review.userId);
    if (reviewer) return reviewer;
  }));
  const users: User[] = usersWithUndefined.filter((user): user is User => user !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "image": movie.imageUrl,
    "description": movie.description,
    "director": movie.directors.join(', '),
    "datePublished": movie.createdAt,
    "genre": movie.genres.join(', ')
  }

  return (
    <>
      <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      </Head>
      <main className="p-5 lg:px-10">
        <MovieDetails movie={movie} />
        <ShowtimePicker showtimes={showtimes} />
        <ModalSeatsPicker showtime={showtime} movie={movie} action={createBooking} />
        <Reviews reviews={reviews} reviewers={users} action={createReview.bind(undefined, movie.id)} />
      </main>
    </>
  );
}


