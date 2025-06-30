export const formatDate = (date: Date | string | number): string => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}; 