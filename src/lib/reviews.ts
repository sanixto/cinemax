import { Review } from '@prisma/client';
import prisma from '../lib/prisma';
import ReviewDto from '@/dto/review.dto';

export async function getReviews(movieId?: string): Promise<Review[] | null> {
  try {
    const data = await prisma.review.findMany({
      where: {
        movieId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews data.');
  }
}

export async function saveReview(review: ReviewDto): Promise<Review | null> {
  try {
    const data = await prisma.review.create({ data: review });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save review data.');
  }
}