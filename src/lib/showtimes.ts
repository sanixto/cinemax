import Showtime from '@/interfaces/showtime.interface';
import prisma from '../lib/prisma';
import { parseDataFromDB } from './parseDataFromDB';

export async function getShowtimes(movieId: string, date?: Date): Promise<Showtime[] | null> {
  let formattedDate: Date | undefined;
  if (date) formattedDate = new Date(date.toISOString().split('T')[0]);

  try {
    const data = await prisma.showtime.findMany({
      where: {
        movie_id: movieId,
        date: formattedDate,
      }
    });

    if (!data) return null;

    const parsedShowtimes = data.map(showtime => parseDataFromDB(showtime));
    parsedShowtimes.map(showtime => {
      return Object.assign(showtime, {
        availableSeats: JSON.parse(showtime.availableSeats)
      });
    });

    return parsedShowtimes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}