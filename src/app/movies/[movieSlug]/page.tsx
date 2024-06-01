import MovieDetails from "@/components/movie-details";
import { getMovie } from "@/lib/movies";
import { notFound } from "next/navigation";

interface MealDetailsPage {
  params: {
    movieSlug: string,
  }
}

export default async function MealDetailsPage({ params }: MealDetailsPage) {
  const movie = await getMovie(params.movieSlug);

  if (!movie) notFound();

  return (
    <main className="p-5 lg:px-10">
      <MovieDetails movie={movie} />
    </main>
  );
}