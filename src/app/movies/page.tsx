import Filter from '@/components/filter';
import MoviesGrid from '@/components/movies-grid/movies-grid';
import Pagination from '@/components/pagination';
import { MOVIES_PER_PAGE } from '@/constants';
import { FilterInterface } from '@/interfaces/filter.interface';
import { getAvailableGenres, getMovies, getMoviesLength } from '@/lib/movies';
import { Movie } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Фільми | Cinemax',
  description: 'Перегляд доступних фільмів у кінотеатрі Cinemax',
}

interface MoviesPageProps {
  searchParams: {
    page?: string,
    genres?: string,
    title?: string,
  }
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const currentPage: number = Number(searchParams?.page) || 1;
  const searchFilters: FilterInterface = {
    genres:  searchParams?.genres?.split(',') || [],
    title: searchParams?.title || '',
  }

  const movies: Movie[] = await getMovies(currentPage, MOVIES_PER_PAGE, searchFilters);
  const moviesLength: number = await getMoviesLength(searchFilters);
  const totalPages: number = Math.ceil(moviesLength / MOVIES_PER_PAGE);
  const availableGenres: string[] = await getAvailableGenres();

  return (
    <main className="p-4 md:p-20 lg:px-40">
      <Filter filter={{genres: availableGenres}} />
      <MoviesGrid movies={movies} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}