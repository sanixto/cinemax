import Image from 'next/image';
import styles from './reviews-list.module.css';
import { formatDateAndTime } from '@/lib/formatDate';
import { Review, User } from '@prisma/client';

interface ReviewsListProps {
  reviews: Review[] | null,
  reviewers: User[] | null,
}

export default function ReviewsList({ reviews, reviewers }: ReviewsListProps) {
  return (
    <ul>
      {reviews && reviews.map(review => {
        const reviewer: User = reviewers?.find(reviewer => reviewer.id === review.userId)!;
        return(
          <li className={`${styles.item}`} key={review.id} >
            <section className={styles.info}>
              <span className={styles.rating}>{review.rating}/10★</span>
              <div className={styles.img}>
                <Image src={reviewer.imageUrl} alt={reviewer.name} sizes="(max-width: 768px) 15vw, 5vw" fill />
              </div>
              <h4>{reviewer.name}</h4>
              <time dateTime={review.createdAt.toString()}>
                {formatDateAndTime(review.createdAt)}
              </time>
            </section>
            {review?.comment &&
              <section className={styles.comment}>
              {review.comment}
            </section>
            }
          </li>
      )})}
   </ul>
  )
}