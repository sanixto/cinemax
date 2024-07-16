export default interface ShowtimeDto {
  movieId: string,
  date: Date,
  time: string,
  availableSeats: boolean[][],
}