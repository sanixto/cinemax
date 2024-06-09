import { Review } from '@prisma/client';
import prisma from '../lib/prisma';
import ReviewDto from '@/dto/review.dto';

interface getReviewsParams {
  movieId?: string,
  userId?: string,
}

export async function getReviews({ movieId, userId }: getReviewsParams): Promise<Review[]> {
  try {
    return await prisma.review.findMany({
      where: {
        movieId: movieId,
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews data.');
  }
}

export async function saveReview(review: ReviewDto): Promise<Review> {
  try {
    return await prisma.review.create({ data: review });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save review data.');
  }
}

export async function updateReview(id: string, review: Partial<ReviewDto>): Promise<Review> {
  try {
    return await prisma.review.update({
      where: { id },
      data: review
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update review data with id ${id}.`);
  }
}

export async function deleteReview(id: string): Promise<Review> {
  try {
    return await prisma.review.delete({ where: { id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete review data with id ${id}.`);
  }
}