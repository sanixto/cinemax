import MoviesGrid from '@/components/movies-grid/movies-grid';
import { getMovies } from '@/lib/movies';

export default async function Home() {
  const movies = await getMovies();
  return (
    <main className="p-4 md:p-10 lg:p-20">
      <MoviesGrid movies={movies} />
    </main>
  );
}
