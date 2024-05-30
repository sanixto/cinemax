import Movie from '@/interfaces/movie.interface';
import { sql } from '@vercel/postgres';

export async function getMovies(page: number, limit: number): Promise<Movie[]> {
  const offset: number = (page - 1) * limit;
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
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
}

export async function getMoviesLength(): Promise<number> {
  try {
    const data = await sql`SELECT COUNT(*) AS count FROM movies`;

    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data length.');
  }
}