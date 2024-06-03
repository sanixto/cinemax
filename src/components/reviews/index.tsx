import styles from './index.module.css';
import Review from '@/interfaces/review.interface';
import User from '@/interfaces/user.interface';
import ReviewsList from './reviews-list';

interface ReviewsProps {
  reviews: Review[] | null,
  reviewers: User[] | null,
}

export default function Reviews({ reviews, reviewers }: ReviewsProps) {
  return (
    <article className={`${styles.article} px-2 md:px-5 lg:md-10 xl:px-20 2xl:px-40`}>
      <h3>Відгуки</h3>
      <ReviewsList reviews={reviews} reviewers={reviewers} />
    </article>
  );
}