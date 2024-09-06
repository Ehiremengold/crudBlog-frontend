import "../AllPosts/AllPosts.css";
import "./SearchResults.css"
import { lazy, Suspense } from "react";
const PostCard = lazy(() =>
  import("../../components/AllPostCard/PostCard.jsx")
);
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const LoadingSpinner = lazy(() =>
  import("../../components/LoadingSpinner/LoadingSpinner.jsx")
);

const SearchResults = () => {
  const location = useLocation();

  // Extract the query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const { isLoading, isError, queryPosts } = useSelector(
    (state) => state.search
  );

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <Suspense>
          <LoadingSpinner />
        </Suspense>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <div className="loading-spinner-container">
          <h3 className="error-fetch">Error fetching data...</h3>
        </div>
      </>
    );
  }

  if (queryPosts.length < 1) {
    return (
      <div className="loading-spinner-container">
        <h3>No Posts yet</h3>
      </div>
    );
  }

  return (
    <>
      <h3 className="search-query">Search Results for &quot;{searchQuery}&quot;</h3>
      <section className="all-posts">
        <div className="all-posts-wrapper">
          {queryPosts.map((post) => {
            const { id } = post;
            return <PostCard key={id} {...post} />;
          })}
        </div>
      </section>
    </>
  );
};
export default SearchResults;
