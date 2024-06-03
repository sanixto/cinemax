import prisma from '../lib/prisma';
import Review from '@/interfaces/review.interface';
import { parseDataFromDB } from './parseDataFromDB';

export async function getReviews(movieId?: string): Promise<Review[] | null> {
  try {
    const data = await prisma.review.findMany({
      where: {
        movie_id: movieId,
      }
    });

    if (!data) return null;

    const parsedReviews: Review[] = data.map(review => parseDataFromDB(review));

    return parsedReviews;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews data.');
  }
}