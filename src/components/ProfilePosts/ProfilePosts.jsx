import { truncateString } from "../../pages/AllPosts/post";
import "./ProfilePosts.css";

const ProfilePosts = ({ imgPath, postTitle, postDescription }) => {
  return (
    <div className="profile-posts">
      <div className="post-card__img">
        <img src={imgPath} alt="" />
      </div>
      <div className="post-card__description">
        <h3>{postTitle}</h3>
        <p>{truncateString(postDescription)}</p>
        <div className="post-details">
          <button>&rarr;</button>
          <p className="timestamp">2 hours ago</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePosts;
