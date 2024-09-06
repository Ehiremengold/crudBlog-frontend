import { Link } from "react-router-dom";
import { truncateString } from "../../pages/AllPosts/post";
import DOMPurify from "dompurify";
import "./PostCard.css";

const PostCard = ({ img, title, body, slug }) => {
  return (
    <div className="post-card">
      <div className="post-card__img">
        <img src={img} alt="" />
      </div>
      <div className="post-card__description">
        <Link to={`post/${slug}`}>
          <h3>{title}</h3>
        </Link>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(truncateString(body)),
          }}
        />
        <Link to={`post/${slug}`}>
          <button>Read more &nbsp; &rarr;</button>
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
