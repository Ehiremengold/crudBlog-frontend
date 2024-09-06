export const truncateTitle = (string, count = 60) => {
  // return string.length > count ? string.slice(0, count) + "..." : string;
  if (string.length > count) {
    return string.slice(0, count) + "...";
  }
  return string;
};

// Production or Not
const environment = import.meta.env.ENVIRONMENT;

export const getUrl = () => {
  return environment === "dev"
    ? `${import.meta.env.VITE_PROD_API_BASE_URL}`
    : `${import.meta.env.VITE_DEV_API_BASE_URL}`;
};
