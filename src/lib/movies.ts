import Movie from '@/interfaces/movie.interface';
import { sql } from '@vercel/postgres';

export async function getMovies() {
  try {
    const data = await sql<Movie>`
      SELECT
        id,
        title,
        description,
        year,
        duration,
        genres,
        directors,
        rating,
        image_url AS "imageUrl",
        trailer_url AS "trailerUrl"
      FROM movies
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}