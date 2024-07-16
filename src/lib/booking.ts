import { Booking } from '@prisma/client';
import prisma from '../lib/prisma';
import BookingDto from '@/dto/booking.dto';

export async function getBookings(userId?: string): Promise<Booking[] | null> {
  try {
    const data = await prisma.booking.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings data.');
  }
}

export async function getBooking(id: string): Promise<Booking | null> {
  try {
    const data = await prisma.booking.findUnique({ where: { id } });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings data.');
  }
}

export async function saveBooking(booking: BookingDto): Promise<Booking> {
  try {
    const data = await prisma.booking.create({ data: booking });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save booking data.');
  }
}

export async function updateBooking(id: string, booking: Partial<BookingDto>): Promise<Booking | null> {
  try {
    const data = await prisma.booking.update({
      where: { id },
      data: booking
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update booking data with id ${id}.`);
  }
}

export async function deleteBooking(id: string): Promise<Booking | null> {
  try {
    const data = await prisma.booking.delete({ where: { id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete booking data with id ${id}.`);
  }
}
