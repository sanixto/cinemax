import Filter from '@/components/filter';
import MoviesGrid from '@/components/movies-grid/movies-grid';
import Pagination from '@/components/pagination';
import { MOVIES_PER_PAGE } from '@/constants';
import Movie from '@/interfaces/movie.interface';
import { getAvailableGenres, getMovies, getMoviesLength } from '@/lib/movies';

interface MoviesPageProps {
  searchParams: {
    page?: string,
    genres?: string,
  }
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const currentPage: number = Number(searchParams?.page) || 1;
  const searchGenres: string[] = searchParams?.genres?.split(',') || [];

  const movies: Movie[] = await getMovies(currentPage, MOVIES_PER_PAGE, { genres: searchGenres });
  const moviesLength: number = await getMoviesLength({ genres: searchGenres });
  const totalPages: number = moviesLength / MOVIES_PER_PAGE;
  const availableGenres: string[] = await getAvailableGenres();

  return (
    <main className="p-4 md:p-20 lg:px-40">
      <Filter filter={{genres: availableGenres}} />
      <MoviesGrid movies={movies} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
