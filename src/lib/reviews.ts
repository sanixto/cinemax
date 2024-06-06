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

export async function updateReview(id: string, review: Partial<ReviewDto>): Promise<Review | null> {
  try {
    const data = await prisma.review.update({
      where: { id },
      data: review
    });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update review data with id ${id}.`);
  }
}

export async function deleteReview(id: string): Promise<Review | null> {
  try {
    const data = await prisma.review.delete({ where: { id } });

    if (!data) return null;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete review data with id ${id}.`);
  }
}