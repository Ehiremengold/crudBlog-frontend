import "./Profile.css";
import {
  // userIcon as lightProfileIcon,
  profileIcon,
} from "../../assets/icons/icons";

import { lazy, useEffect, useState } from "react";
import { homePosts } from "../../pages/AllPosts/post.js";
const ProfilePosts = lazy(() =>
  import("../../components/ProfilePosts/ProfilePosts.jsx")
);
// import { useThemeContext } from "../../Base.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../features/authentication/profile/profileSlice.js";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();
  // const { state } = useThemeContext();
  const { username, email } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [dispatch, username]);

  return (
    <section className="profile">
      <div className="profile-wrapper">
        <div className="profile-user__detail-card">
          <div className="profileIcon">
            <img src={profileIcon} alt="" />
          </div>
          <div className="profile-user_description">
            <h3>{username}</h3>
            <p>{email}</p>
          </div>
          <div className={`follow-user`}>
            <button className="follow-btn">Follow</button>
          </div>
        </div>

        <div className="tab-controller">
          <div className="tab-controller__wrapper">
            <button
              onClick={() => setActiveTab(0)}
              className={`${activeTab === 0 ? "active" : ""}`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`${activeTab === 1 ? "active" : ""}`}
              disabled
            >
              Following (0)
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`${activeTab === 2 ? "active" : ""}`}
              disabled
            >
              Followers (0)
            </button>
          </div>
        </div>

        <div className="tab-controller-view">
          {activeTab === 0 ? (
            <div className="profile-post-grid">
              {homePosts.map((post) => {
                const { id } = post;
                return <ProfilePosts key={id} {...post} />;
              })}
              {homePosts.map((post) => {
                const { id } = post;
                return <ProfilePosts key={id} {...post} />;
              })}
            </div>
          ) : null}
          {activeTab === 1 ? "Tab 2" : null}
          {activeTab === 2 ? "Tab 3" : null}
        </div>
      </div>
    </section>
  );
};

export default Profile;
