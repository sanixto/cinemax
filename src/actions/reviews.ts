'use server';

import { revalidatePath } from 'next/cache';
import { getSession, Session } from '@auth0/nextjs-auth0';

import { saveReview } from '@/lib/reviews';
import Auth0User from '@/interfaces/auth0User.interface';
import User from '@/interfaces/user.interface';
import { getUserByEmail } from '@/lib/users';

interface createReviewState {
  errorMessages: string[],
}

export async function createReview(movieId: string, prevState: createReviewState, formData: FormData): Promise<createReviewState> {
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
  const rating: number = Number(formData.get('rating')?.toString());
  const comment: string = formData.get('comment')?.toString()!;

  const errorMessages: string[] = [];

  if (!rating) {
    errorMessages.push('Ratinng is required.')
  }

  if (!comment || comment.trim().length === 0) {
    errorMessages.push('Comment is required.')
  }

  if (rating < 0 || rating > 10) {
    errorMessages.push('Rating must be greater than 0 and less than 10.')
  }

  if (errorMessages.length > 0) return { errorMessages };
  if (user) {
    saveReview({
      userId: user?.id,
      movieId,
      rating,
      comment,
    });
  }

  revalidatePath(`/movies/${movieId}`, 'page');
  return { errorMessages };
}