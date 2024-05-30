import MoviesGrid from '@/components/movies-grid/movies-grid';
import Pagination from '@/components/pagination';
import { MOVIES_PER_PAGE } from '@/constants';
import { getMovies, getMoviesLength } from '@/lib/movies';

interface MoviesPageProps {
  searchParams: {
    page?: string,
  }
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const movies = await getMovies(currentPage, MOVIES_PER_PAGE);
  const moviesLengh = await getMoviesLength();
  const totalPages = moviesLengh / MOVIES_PER_PAGE;

  return (
    <main className="p-4 md:p-10 lg:p-20">
      <MoviesGrid movies={movies} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
