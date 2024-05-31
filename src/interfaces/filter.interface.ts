export type FilterKey = 'genres'; // Add other keys as needed
export type FilterInterface = {
  [key in FilterKey]?: string[];
};
