import { Showtime } from '@prisma/client';
import prisma from '../lib/prisma';

export async function getShowtimes(movieId: string, date?: Date): Promise<Showtime[] | null> {
  let formattedDate: Date | undefined;
  if (date) formattedDate = new Date(date.toISOString().split('T')[0]);

  try {
    const data = await prisma.showtime.findMany({
      where: {
        movieId,
        date: formattedDate,
      }
    });

    if (!data) return null;

    // data.map(showtime => {
    //   return Object.assign(showtime, {
    //     availableSeats: JSON.parse(showtime.availableSeats)
    //   });
    // });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}

export async function getShowtime(id: string): Promise<Showtime | null> {
  try {
    const data = await prisma.showtime.findUnique({ where: { id: id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}