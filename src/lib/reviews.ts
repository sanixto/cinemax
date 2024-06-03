import prisma from '../lib/prisma';
import Review from '@/interfaces/review.interface';
import { parseDataFromDB, prepareDataForDB } from './databaseData';

export async function getReviews(movieId?: string): Promise<Review[] | null> {
  try {
    const data = await prisma.review.findMany({
      where: {
        movie_id: movieId,
      },
      orderBy: {
        created_at: 'desc'
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

export async function saveReview(review: Partial<Review>): Promise<Review | null> {
  const preparedReview = prepareDataForDB(review);
  try {
    const data = await prisma.review.create({
      data: preparedReview
    });

    if (!data) return null;

    const parsedReview: Review = parseDataFromDB(review);

    return parsedReview;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save review data.');
  }
}