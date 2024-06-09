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
    return await prisma.movie.findMany({
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
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
}

export async function getMoviesLength(filter?: FilterInterface): Promise<number> {
  try {
    return await prisma.movie.count({
      where: {
        genres: {
          hasEvery: filter?.genres,
        },
        title: {
          contains: filter?.title?.toLowerCase(),
        }
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data length.');
  }
}

export async function getMovie(id: string): Promise<Movie | null> {
  try {
    return await prisma.movie.findUnique({ where: { id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch movie data with id${id}`);
  }
}

export async function updateMovie(id: string, movie: Partial<MovieDto>): Promise<Movie> {
  try {
    return await prisma.movie.update({
      where: { id },
      data: movie
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update movie data with id ${id}.`);
  }
}

export async function deleteMovie(id: string): Promise<Movie> {
  try {
    return await prisma.movie.delete({ where: { id } });
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

export async function updateRating(id: string, rating: number): Promise<Movie> {
  try {
    const currentMovie = await prisma.movie.findUnique({ where: { id } });

    if (!currentMovie) {
      throw new Error(`Movie with id ${id} not found.`);
    }

    const newVotes = currentMovie.votes + 1;
    const newRating = (currentMovie.rating * currentMovie.votes + rating) /  newVotes;

    return await prisma.movie.update({
      where: {
        id,
      },
      data: {
        rating: newRating,
        votes: newVotes,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update movie rating with id${id}`);
  }
}