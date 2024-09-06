export const truncateTitle = (string, count = 60) => {
  // return string.length > count ? string.slice(0, count) + "..." : string;
  if (string.length > count) {
    return string.slice(0, count) + "...";
  }
  return string;
};

export const url = `${import.meta.env.VITE_API_BASE_URL}/api/`;
