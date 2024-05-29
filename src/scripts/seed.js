import { db } from '@vercel/postgres';
import { movies } from '../lib/placeholder-data.js';

async function seedMovies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "movies" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS movies (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        year INT NOT NULL,
        duration INT NOT NULL,
        genres TEXT[],
        directors TEXT[],
        rating NUMERIC(3, 1),
        image_url TEXT,
        trailer_url TEXT
      );
    `;

    console.log(`Created "movies" table`);

    // Insert data into the "movies" table
    const insertedMovies = await Promise.all(
      movies.map(async (movie) => {
        const {id, title, description, year, duration, genres, directors, rating, imageUrl, trailerUrl} = movie;
        return client.sql`
          INSERT INTO movies (id, title, description, year, duration, genres, directors, rating, image_url, trailer_url)
          VALUES (
            ${id},
            ${title},
            ${description},
            ${year},
            ${duration},
            ARRAY[${genres.map(genre => `'${genre}'`).join(',')}],
            ARRAY[${directors.map(director => `'${director}'`).join(',')}],
            ${rating},
            ${imageUrl},
            ${trailerUrl}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedMovies.length} movies`);

    return {
      createTable,
      movies: insertedMovies,
    };
  } catch (error) {
    console.error('Error seeding movies:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await seedMovies(client);
  } catch (err) {
    console.error('An error occurred while attempting to seed the database:', err);
  } finally {
    client.release();
  }
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});