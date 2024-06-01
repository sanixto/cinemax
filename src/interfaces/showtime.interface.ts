export default interface Showtime {
  id: string,
  movieId: string,
  date: Date,
  time: string,
  availableSeats: boolean[][],
}