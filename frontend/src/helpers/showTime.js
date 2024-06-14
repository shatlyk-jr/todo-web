// dateUtils.js
function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Extract the day, month, and year from the Date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Extract the hours and minutes from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the formatted date string
  return `${day}.${month}.${year} - ${hours}:${minutes}`;
}

// Export the function so it can be used in other files
export { formatDate };
