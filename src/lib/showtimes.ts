import { Showtime } from '@prisma/client';
import prisma from '../lib/prisma';
import ShowtimeDto from '@/dto/showtime.dto';

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

export async function saveShowtime(showtime: ShowtimeDto): Promise<Showtime | null> {
  try {
    const data = await prisma.showtime.create({ data: showtime });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save showtime data.');
  }
}

export async function updateShowtime(id: string, showtime: Partial<ShowtimeDto>): Promise<Showtime | null> {
  try {
    const data = await prisma.showtime.update({
      where: { id },
      data: showtime
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update showtime data with id ${id}.`);
  }
}

export async function deleteShowtime(id: string): Promise<Showtime | null> {
  try {
    const data = await prisma.showtime.delete({ where: { id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete showtime data with id ${id}.`);
  }
}