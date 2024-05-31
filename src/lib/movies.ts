import Movie from '@/interfaces/movie.interface';
import prisma from '../lib/prisma';

interface Filters {
  genres?: string[],
}

export async function getMovies(page?: number, limit?: number, filters?: Filters): Promise<Movie[]> {
  let offset: number = 0;

  if (page && limit) {
    offset = (page - 1) * limit;
  }

  try {
    const data = await prisma.movies.findMany({
      where: {
        genres: {
          hasEvery: filters?.genres,
        },
      },
      take: limit,
      skip: offset,
    });

    const transformedData: Movie[] = data.map(movie => ({
      ...movie,
      imageUrl: movie.image_url,
      trailerUrl: movie.trailer_url,
      image_url: undefined,
      trailer_url: undefined,
    }));

    return transformedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
}

export async function getMoviesLength(filters?: Filters): Promise<number> {
  try {
    const count = await prisma.movies.count({
      where: {
        genres: {
          hasEvery: filters?.genres,
        },
      },
    });
    return count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data length.');
  }
}

export async function getAvailableGenres(): Promise<string[]> {
  try {
    const data = await prisma.movies.findMany({
      distinct: ['genres'],
      select: { genres: true },
    });
    const splitedGenres = data.map(item => item.genres).flat();
    const uniqueGenres = Array.from(new Set(splitedGenres));
    return uniqueGenres;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies genres.');
  }
}