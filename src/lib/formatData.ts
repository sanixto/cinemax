export const formatRating = (rating: number) => {
  if (Number.isInteger(rating)) {
    return rating;
  } else {
    return rating.toFixed(1);
  }
}