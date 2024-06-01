import MovieDetails from "@/components/movie-details";
import ShowtimePicker from "@/components/movie-details/showtime-picker";
import Showtime from "@/interfaces/showtime.interface";
import { getMovie } from "@/lib/movies";
import { getShowtimes } from "@/lib/showtimes";
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

  return (
    <main className="p-5 lg:px-10">
      <MovieDetails movie={movie} />
      <ShowtimePicker showtimes={showtimes} />
    </main>
  );
}