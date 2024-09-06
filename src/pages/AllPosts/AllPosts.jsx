import "./AllPosts.css";
import { lazy, useEffect, Suspense } from "react";
const PostCard = lazy(() =>
  import("../../components/AllPostCard/PostCard.jsx")
);
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  resetErrorState,
  toggleSuccessState,
} from "../../features/blog/postSlice.js";
const LoadingSpinner = lazy(() =>
  import("../../components/LoadingSpinner/LoadingSpinner.jsx")
);

const AllPosts = () => {
  const { isLoading, isError, posts, isSuccessful } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, isSuccessful]);

  useEffect(() => {
    dispatch(resetErrorState());
  }, []);

  useEffect(() => {
    if (isSuccessful) {
      dispatch(toggleSuccessState()); // Reset the success state after dispatch
    }
  }, [isSuccessful, dispatch]);

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

  if (posts.length < 1) {
    return (
      <div className="loading-spinner-container">
        <h3>No Posts yet</h3>
      </div>
    );
  }

  return (
    <section className="all-posts">
      <div className="all-posts-wrapper">
        {posts.map((post) => {
          const { id } = post;
          return <PostCard key={id} {...post} />;
        })}
      </div>
    </section>
  );
};
export default AllPosts;
