import Image from 'next/image';

import styles from './index.module.css';
import Movie from '@/interfaces/movie.interface';
import Player from './player';

interface MovieDetailsProps {
  movie: Movie,
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  return (
    <article className={styles.article}>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <section>
          <div className={styles["img-container"]}>
            <Image
              src={movie.imageUrl}
              alt={movie.id}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              fill />
          </div>
        </section>
        <section className={styles.details}>
          <h2>{movie.title}</h2>
          <ul>
            <li><b>Рейтинг:</b> {movie.rating}★</li>
            <li><b>Рік:</b> {movie.year}</li>
            <li><b>Час:</b> {hours && `${hours} год `} {minutes && `${minutes} хв `}</li>
            <li><b>Жанр:</b> {movie.genres.join(', ')}</li>
            <li><b>Режисер:</b> {movie.directors.join(', ')}</li>
            <li>
              <b>Опис Фільму:</b>
              <p>{movie.description}</p>
            </li>
          </ul>
        </section>
      </div>
      <section>
        <h4>Трейлер</h4>
        <Player url={movie.trailerUrl} />
      </section>
    </article>
  );
}