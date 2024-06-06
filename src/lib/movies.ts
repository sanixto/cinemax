import prisma from '../lib/prisma';
import { Movie } from '@prisma/client';
import { FilterInterface } from '@/interfaces/filter.interface';
import MovieDto from '@/dto/movie.dto';

export async function getMovies(page?: number, limit?: number, filter?: FilterInterface): Promise<Movie[]> {
  let offset: number = 0;

  if (page && limit) {
    offset = (page - 1) * limit;
  }

  try {
    const data = await prisma.movie.findMany({
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

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
}

export async function getMoviesLength(filter?: FilterInterface): Promise<number> {
  try {
    const count = await prisma.movie.count({
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
    const data = await prisma.movie.findUnique({ where: { id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch movie data with id${id}`);
  }
}

export async function updateMovie(id: string, movie: Partial<MovieDto>): Promise<Movie | null> {
  try {
    const data = await prisma.movie.update({
      where: { id },
      data: movie
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update movie data with id ${id}.`);
  }
}

export async function deleteMovie(id: string): Promise<Movie | null> {
  try {
    const data = await prisma.movie.delete({ where: { id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete movie data with id ${id}.`);
  }
}

export async function getAvailableGenres(): Promise<string[]> {
  try {
    const data = await prisma.movie.findMany({
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

export async function updateRating(id: string, rating: number): Promise<Movie | null> {
  try {
    const currentMovie = await prisma.movie.findUnique({ where: { id } });

    if (!currentMovie) {
      console.error(`Movie with id ${id} not found.`);
      return null;
    }

    const newVotes = currentMovie.votes + 1;
    const newRating = (currentMovie.rating + rating) / newVotes;

    const data = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        rating: newRating,
        votes: newVotes,
      },
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update movie rating with id${id}`);
  }
}