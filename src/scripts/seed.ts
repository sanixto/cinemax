import { movies, reviews, showtimes, users } from '../lib/placeholder-data';
import prisma from '../lib/prisma';

async function seedMovies() {
  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        id: movie.id,
        title: movie.title?.toLowerCase(),
        description: movie.description,
        year: movie.year,
        duration: movie.duration,
        genres: movie.genres,
        directors: movie.directors,
        rating: movie.rating,
        votes: movie.votes,
        imageUrl: movie.imageUrl,
        trailerUrl: movie.trailerUrl,
      },
    });
  }
  console.log(`Seeded ${movies.length} movies`);
}

async function seedShowtimes() {
  for (const showtime of showtimes) {
    const formattedDate = new Date(showtime.date.toISOString().split('T')[0]);
    await prisma.showtime.create({
      data: {
        id: showtime.id,
        movieId: showtime.movieId,
        date: formattedDate,
        time: showtime.time,
        availableSeats: JSON.stringify(showtime.availableSeats),
      },
    });
  }
  console.log(`Seeded ${showtimes.length} showtimes`);
}

async function seedUsers() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log(`Seeded ${users.length} users`);
}

async function seedReviews() {
  for (const review of reviews) {
    await prisma.review.create({
      data: {
        id: review.id,
        userId: review.userId,
        movieId: review.movieId,
        rating: review.rating,
        comment: review.comment,
      },
    });
  }
  console.log(`Seeded ${reviews.length} users`);
}

async function main() {
  try {
    await seedMovies();
    await seedShowtimes();
    await seedUsers();
    await seedReviews();
  } catch (err) {
    console.error('An error occurred while attempting to seed the database:', err);
  }
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});