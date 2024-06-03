import MovieDetails from "@/components/movie-details";
import ShowtimePicker from "@/components/movie-details/showtime-picker";
import Reviews from "@/components/reviews";
import Review from "@/interfaces/review.interface";
import Showtime from "@/interfaces/showtime.interface";
import User from "@/interfaces/user.interface";
import { getMovie } from "@/lib/movies";
import { getReviews } from "@/lib/reviews";
import { getShowtimes } from "@/lib/showtimes";
import { getUser } from "@/lib/users";
import { notFound } from "next/navigation";

interface MealDetailsPage {
  params: {
    movieSlug: string,
  },
  searchParams: {
    date?: string,
  }
}

export default async function MealDetailsPage({ params, searchParams }: MealDetailsPage) {
  const selectedDateStr: string | undefined = searchParams?.date;
  const date = selectedDateStr ? new Date(selectedDateStr) : new Date();
  const movie = await getMovie(params.movieSlug);

  if (!movie) notFound();

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
      <Reviews reviews={reviews} reviewers={users} />
    </main>
  );
}