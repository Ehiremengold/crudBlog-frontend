import "./Home.css";
import blogBg from "../../assets/bg/blog-bg.avif";
// import { truncateString } from "../AllPosts/post";
// import { useThemeContext } from "../../Base.jsx";
import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPopularPost } from "../../features/blog/postSlice.js";
import PageSpinner from "../../components/PageSpinner/PageSpinner.jsx";
const PostCard = lazy(() =>
  import("../../components/HomePostCard/PostCard.jsx")
);

const Home = () => {
  const { popularPosts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularPost());
  }, []);

  // const { state } = useThemeContext();

  return (
    <>
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-description">
            <h1>Discover the Latest Insights and Trends</h1>
            <p>
              Our blog is your go-to destination for the latest news, tips, and
              insights across a variety of topics.
            </p>
            <Link to="/all/posts">
              <button className="hero-description__btn">View Posts</button>
            </Link>
          </div>
          <div className="blog-bg">
            <img src={blogBg} alt="" />
          </div>
        </div>
      </section>

      <section className={`featured-posts `}>
        {/* ${state.theme === "dark" && "dark"} */}
        <div className="featured-posts-wrapper">
          <h2>Popular</h2>
          <p>
            Explore our popular blog posts and stay up-to-date with the latest
            trends and insights.
          </p>
          <div className="featured-posts-container">
            {isLoading ? (
              <PageSpinner />
            ) : (
              popularPosts.map((post) => {
                return <PostCard key={post.id} {...post} />;
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
