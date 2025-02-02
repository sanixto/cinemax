import Image from 'next/image';

import styles from './movie-card.module.css';
import { formatRating } from '@/lib/formatData';
import { Movie } from '@prisma/client';

interface MovieCardProps {
  movie: Movie,
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className={styles.card}>
      <header>
        <div className={styles["img-container"]}>
          <Image
            src={movie.imageUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          />
        </div>
      </header>
      <div className={styles.info}>
        <span>★{formatRating(movie.rating)}</span>
        <h3>{movie.title}</h3>
      </div>
    </article>
  );
}