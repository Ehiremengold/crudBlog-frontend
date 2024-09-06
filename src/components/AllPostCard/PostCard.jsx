import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "../../pages/AllPosts/post";
import "./PostCard.css";
import DOMPurify from "dompurify";
import { truncateTitle } from "../../utils";
import OutlineBookmarkIcon from "../../assets/jsx-icons/OutlineBookmarkIcon.jsx";
import FilledBookmarkIcon from "../../assets/jsx-icons/FilledBookmarkIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkPost,
} from "../../features/bookmark/bookmarkSlice.js";

const PostCard = ({ img, title, body, slug }) => {
  const navigate = useNavigate();
  const { bookmarks = [] } = useSelector((store) => store.bookmark);
  const isBookmarked = bookmarks.includes(slug);
  // console.log(isBookmarked);
  
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate(`/post/${slug}`);
  };

  const handleBookmark = () => {
    dispatch(bookmarkPost({ slug, isBookmarked }));
  };


  return (
    <div className="all-post-card">
      <div className="all-post-card__img">
        <img src={img} alt="" />
        <div className="category">
          <h5>{truncateString("CATEGORY", 8)}</h5>
        </div>
      </div>
      <div className="all-post-card__description">
        <Link to={`/post/${slug}`}>
          <h4>{truncateTitle(title)}</h4>
        </Link>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(truncateString(body)),
          }}
        />

        <div className="card-actions">
          <button className="bookmark-btn" onClick={handleBookmark}>
            {isBookmarked ? <FilledBookmarkIcon /> : <OutlineBookmarkIcon />}
          </button>

          <button className="read-more" onClick={handleNavigation}>
            Read more &nbsp; &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
