export default function getFormattedTime(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0"); // pad with '0' if single digit
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
