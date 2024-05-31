import Movie from "@/interfaces/movie.interface";
import MovieCard from "./movie-card";

interface MoviesGridProps {
  movies: Movie[],
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-4">
      {movies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}