import Image from 'next/image';

import styles from './movie-card.module.css';
import Movie from '@/interfaces/movie.interface';

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
        <span>★{movie.rating}</span>
        <h3>{movie.title}</h3>
      </div>
    </article>
  );
}