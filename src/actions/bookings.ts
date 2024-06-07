'use server';

import { revalidatePath } from 'next/cache';
import { getSession, Session } from '@auth0/nextjs-auth0';

import Auth0User from '@/interfaces/auth0User.interface';
import { getUserByEmail } from '@/lib/users';
import { Booking, User } from '@prisma/client';
import { saveBooking, updateBooking } from '@/lib/booking';
import { TICKET_PRICE } from '@/constants';

interface createBookingState {
  bookingId: string,
}


export async function createBooking(showtimeId: string, seats: string[], prevState: createBookingState, formData: FormData): Promise<createBookingState> {
  const session: Session | null | undefined = await getSession();
  let user: User | null = null;
  if (session && session.user) {
    const auth0User = session.user as Auth0User;
    try {
      user = await getUserByEmail(auth0User.email);
    } catch(e) {
      console.log(e);
    }
  }

  if (!user) throw new Error('401 Unuthorized');
  let booking: Booking | null = null;
  try {
    booking = await saveBooking({
      userId: user?.id,
      showtimeId,
      seats,
      price: seats.length * TICKET_PRICE,
      isPayed: false,
    });
  } catch (e) {
    console.log(e);
  }
  if (!booking) return prevState;
  revalidatePath(`/}`, 'layout');
  return { bookingId: booking.id };;
}

interface updatePaymentStateStatus {
  isPayed: boolean,
}

export async function updatePaymentStatus(booking: Booking, prevState: updatePaymentStateStatus, formData: FormData): Promise<updatePaymentStateStatus> {
  const updatedBooking: Booking | null = await updateBooking(booking.id, { isPayed: !booking.isPayed});
  if (updatedBooking) return { isPayed: updatedBooking?.isPayed };
  return prevState;
}