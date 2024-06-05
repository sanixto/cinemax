export default interface MovieDto {
  title: string,
  description: string,
  year: number,
  duration: number,
  genres: string[],
  directors: string[],
  rating: number,
  votes: number,
  imageUrl: string,
  trailerUrl: string,
}