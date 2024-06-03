'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import styles from './index.module.css';
import Review from '@/interfaces/review.interface';
import User from '@/interfaces/user.interface';
import ReviewsList from './reviews-list';
import ReviewForm from './review-form';

interface ReviewsProps {
  reviews: Review[] | null,
  reviewers: User[] | null,
  action: (prevState: { errorMessages: string[] }, formData: FormData) => Promise<{ errorMessages: string[] }>,
}

export default function Reviews({ reviews, reviewers, action }: ReviewsProps) {
  const { user } = useUser();
  return (
    <article className={`${styles.article} px-2 md:px-5 lg:md-10 xl:px-20 2xl:px-40`}>
      <h3>Відгуки({reviews?.length || 0})</h3>
      {user ? (
        <ReviewForm action={action} />
      ): (
        <div className="warning">
          <h4>Щоб залишити відгук, будь ласка, авторизуйтеся.</h4>
        </div>
      )}
      <ReviewsList reviews={reviews} reviewers={reviewers} />
    </article>
  );
}