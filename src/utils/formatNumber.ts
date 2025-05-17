export function formatNumber(num: number): string {
  if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + " Triliun"; // Trillion in Indonesian
  }
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + " Miliar"; // Billion in Indonesian
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + " Juta"; // Million in Indonesian
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1) + " Ribu"; // Thousand in Indonesian
  }
  return num.toString(); // No formatting for numbers less than 1000
}
