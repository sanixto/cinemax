export default interface Movie {
  id: string,
  title: string,
  description: string,
  year: number,
  duration: number,
  genres: string[],
  directors: string[],
  rating: number,
  imageUrl: string,
  trailerUrl: string,
}