import Movie from '@/interfaces/movie.interface';
import prisma from '../lib/prisma';
import { FilterInterface } from '@/interfaces/filter.interface';

const transformMovie = (data: any): Movie => {
  return ({
    id: data.id,
    title: data.title,
    description: data.description,
    year: data.year,
    duration: data.duration,
    genres: data.genres,
    directors: data.directors,
    rating: data.rating,
    imageUrl: data.image_url,
    trailerUrl: data.trailer_url,
  });
}

export async function getMovies(page?: number, limit?: number, filter?: FilterInterface): Promise<Movie[]> {
  let offset: number = 0;

  if (page && limit) {
    offset = (page - 1) * limit;
  }

  try {
    const data = await prisma.movies.findMany({
      where: {
        genres: {
          hasEvery: filter?.genres,
        },
          title: {
            contains: filter?.title?.toLowerCase(),
          }
      },
      take: limit,
      skip: offset,
    });

    const transformedData: Movie[] = data.map(movie => transformMovie(movie));

    return transformedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
}

export async function getMoviesLength(filter?: FilterInterface): Promise<number> {
  try {
    const count = await prisma.movies.count({
      where: {
        genres: {
          hasEvery: filter?.genres,
        },
          title: {
            contains: filter?.title?.toLowerCase(),
          }
      },
    });
    return count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data length.');
  }
}

export async function getMovie(id: string): Promise<Movie | null> {
  try {
    const data = await prisma.movies.findFirst({
      where: {
       id: id,
      },
    });

    if (!data) return null;
    const transformedData = transformMovie(data);

    return transformedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch movie data with id${id}`);
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