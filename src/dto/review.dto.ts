export default interface ReviewDto {
  userId: string,
  movieId: string,
  rating: number,
  comment: string | null
}