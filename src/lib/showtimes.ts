import Showtime from '@/interfaces/showtime.interface';
import prisma from '../lib/prisma';

const transformShowtime = (data: any): Showtime => {
  return ({
    id: data.id,
    movieId: data.movie_id,
    date: data.date,
    time: data.time,
    availableSeats: JSON.parse(data.available_seats),
  });
}

export async function getShowtimes(movieId: string, date?: Date): Promise<Showtime[] | null> {
  let formattedDate: Date | undefined;
  if (date) formattedDate = new Date(date.toISOString().split('T')[0]);

  try {
    const data = await prisma.showtimes.findMany({
      where: {
        movie_id: movieId,
        date: formattedDate,
      }
    });

    if (!data) return null;

    const transformedData: Showtime[] = data.map(showtime => transformShowtime(showtime));

    return transformedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}