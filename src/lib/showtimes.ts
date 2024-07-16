import { Showtime } from '@prisma/client';
import prisma from '../lib/prisma';
import ShowtimeDto from '@/dto/showtime.dto';

export async function getShowtimes(movieId: string, date?: Date): Promise<Showtime[]> {
  let formattedDate: Date | undefined;
  if (date) formattedDate = new Date(date.toISOString().split('T')[0]);

  try {
    const data = await prisma.showtime.findMany({
      where: {
        movieId,
        date: formattedDate,
      }
    });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}

export async function getShowtime(id: string): Promise<Showtime | null> {
  try {
    return await prisma.showtime.findUnique({ where: { id: id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch showtimes data.');
  }
}

export async function saveShowtime(showtime: ShowtimeDto): Promise<Showtime | null> {
  try {
    return await prisma.showtime.create({ data: showtime });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save showtime data.');
  }
}

export async function updateShowtime(id: string, showtime: Partial<ShowtimeDto>): Promise<Showtime> {
  try {
    return await prisma.showtime.update({
      where: { id },
      data: showtime
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update showtime data with id ${id}.`);
  }
}

export async function deleteShowtime(id: string): Promise<Showtime> {
  try {
    return prisma.showtime.delete({ where: { id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete showtime data with id ${id}.`);
  }
}