export const homePosts = [
  {
    id: 1,
    imgPath: "/src/assets/blog-imgs/creativity.jpg",
    postTitle: "Unlocking the Power of Creativity",
    postDescription:
      "Discover the secrets to unleashing your creative potential and transforming your ideas into reality.",
  },
  {
    id: 2,
    imgPath: "/src/assets/blog-imgs/mindful.jpg",
    postTitle: "Mastering the Art of Mindfulness",
    postDescription:
      "Explore the transformative power of mindfulness and learn how to cultivate a deeper sense of presence and well",
  },
  {
    id: 3,
    imgPath: "/src/assets/blog-imgs/digital.jpg",
    postTitle: "Navigating the Digital Landscape",
    postDescription:
      "Explore the latest trends and strategies for thriving in the digital age and staying ahead of the curve.",
  },
];


export function truncateString(str, maxLength = 93) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}