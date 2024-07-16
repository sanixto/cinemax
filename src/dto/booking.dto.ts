export default interface BookingDto {
  userId: string,
  showtimeId: string,
  seats: string[],
  price: number,
  isPayed: boolean,
}