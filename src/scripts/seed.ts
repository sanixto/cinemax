import { movies } from '../lib/placeholder-data';
import prisma from '../lib/prisma';

export default async function seedMovies() {
  for (const movie of movies) {
    await prisma.movies.create({
      data: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        year: movie.year,
        duration: movie.duration,
        genres: movie.genres,
        directors: movie.directors,
        rating: movie.rating,
        image_url: movie.imageUrl,
        trailer_url: movie.trailerUrl,
      },
    });
  }
  console.log(`Seeded ${movies.length} movies`);
}

async function main() {
  try {
    await seedMovies();
  } catch (err) {
    console.error('An error occurred while attempting to seed the database:', err);
  }
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});