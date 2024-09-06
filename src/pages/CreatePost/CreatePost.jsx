import { useEffect, useState, useRef } from "react";
import "./CreatePost.css";
import "quill/dist/quill.snow.css"; // Import the Snow theme styles
import Quill from "quill";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePost,
  sendPost,
  toggleSuccessState,
  updatePost,
} from "../../features/blog/postSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [img, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const refContainer = useRef(null);
  const navigate = useNavigate(null);
  const param = useParams();

  const { postDetail } = useSelector((state) => state.post);

  const { isLoading, isSuccessful } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    refContainer.current.focus();
    const options = {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading options
          ["bold", "italic", "underline"], // Text formatting options
          [{ list: "ordered" }, { list: "bullet" }], // Lists
          ["link", "image"], // Links and images
          ["blockquote", "code-block"], // Block elements
        ],
      },
      placeholder: "Enter post body...",
      theme: "snow",
    };

    const container = document.getElementById("editor");
    const quillInstance = new Quill(container, options);

    // If editing, set the initial content
    if (param.slug && postDetail) {
      setTitle(postDetail.title);
      setImagePreview(postDetail.img); // Assuming you want to handle this differently if editing
      quillInstance.root.innerHTML = postDetail.body;
    }

    setEditor(quillInstance);

    // Clean up function to destroy the Quill instance if needed
    return () => {
      if (quillInstance) {
        quillInstance.disable();
      }
    };
  }, [param.slug, postDetail]);

  useEffect(() => {
    if (isSuccessful) {
      navigate("/all/posts");
    }
    dispatch(toggleSuccessState());
  }, [isSuccessful, navigate, dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Create a local URL for the image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (editor) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("img", img);
      formData.append("body", editor.root.innerHTML);
      // const body = editor.root.innerHTML; // Get editor content
      // const postObj = { body, title, img };

      if (param.slug) {
        formData.append("slug", param.slug);
        dispatch(updatePost({ postSlug: param.slug, updatePostObj: formData }));
      } else {
        dispatch(sendPost(formData));
      }
    }
  };

  return (
    <div className="create-post">
      <div className="create-post__wrapper">
        <div className="input-container">
          <input
            ref={refContainer}
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="post-title-input"
          />
        </div>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Post Preview" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-file-input"
        />
        <div id="editor"></div>
        <button className="publish-btn" onClick={handleSubmit}>
          {isLoading ? <LoadingSpinner /> : param.slug ? "Update" : "Publish"}
        </button>
        {/* Example button */}
      </div>
    </div>
  );
};

export default CreatePost;
