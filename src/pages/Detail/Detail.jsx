import "./Detail.css";
import RelatedPost from "../../components/RelatedPost/RelatedPost";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrievePost, deletePost } from "../../features/blog/postSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DOMPurify from "dompurify";
import { closeModal, openModal } from "../../features/modal/modalSlice";

const Detail = () => {
  const param = useParams();
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePost(param.slug));
  }, [dispatch, param.slug]);

  useEffect(() => {
    dispatch(closeModal())
  }, [location])

  const { isLoading, isError, postDetail } = useSelector((state) => state.post);
  const { modalOpen } = useSelector((state) => state.modal);

  const { email: loggedInUser } = useSelector((state) => state.login);
  const navigate = useNavigate();

  if (!postDetail || isLoading) {
    return (
      <div className="loading-spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loading-spinner-container">
        <h3>Error Loading data...</h3>
      </div>
    );
  }
  const handleDeletePost = (slug) => {
    dispatch(deletePost(slug));
    dispatch(closeModal());
    navigate("/all/posts");
  };

  const { title, user, img, created, body, comments, slug, category } =
    postDetail || {};
  const { email, username } = user || {};

  return (
    <>
      {modalOpen && (
        <div className="modal">
          <div className="delete-confirmation">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="action-confirm-btns">
              <button
                className="cancel-btn"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeletePost(slug)}
              >
                {isLoading ? <LoadingSpinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="detail" style={{ backgroundImage: `url(${img})` }}>
        <div className="post-detail__header">
          <h1>{title}</h1>
          <div className="post-detail__desc">
            <p>By {username}</p>
            <div>|</div>
            <p>{created}</p>
          </div>
        </div>
      </section>

      <section className="post-body">
        <div className="post-body__wrapper">
          <div className="left__main-body">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(body),
              }}
            />
            {loggedInUser === email && (
              <div className="action-btns">
                <button
                  className="update-btn"
                  onClick={() => navigate(`/update/post/${slug}`)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(openModal())}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="right__main-body">
            <h1>Related Posts</h1>
            <div className="related-posts">
              {[1, 2, 3].map((post, index) => {
                return <RelatedPost key={index} />;
              })}
            </div>
            <h1>Category</h1>
            <button className="category-btn">{category}</button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Detail;
