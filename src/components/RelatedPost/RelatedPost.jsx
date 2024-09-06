import { truncateString } from "../../pages/AllPosts/post";

const RelatedPost = () => {
  return (
    <div className="related-post">
      <div className="related-post-img" />
      <div className="related_post__desc">
        <a href="">
          <h3>Related Post 1</h3>
        </a>
        <p>
          {truncateString(
            "dolorum! Expedita doloremque autem at quis? Officiis consectetur laborum voluptates, quo culpa dicta, a accusantium dolores sed",
            50
          )}
        </p>
      </div>
    </div>
  );
};
export default RelatedPost;
