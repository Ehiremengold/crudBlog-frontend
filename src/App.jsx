import "./App.css";
import Base from "./Base.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Suspense, lazy } from "react";
import PageSpinner from "./components/PageSpinner/PageSpinner.jsx";

// Lazy load the components
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const AllPosts = lazy(() => import("./pages/AllPosts/AllPosts.jsx"));
const Detail = lazy(() => import("./pages/Detail/Detail.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Registration = lazy(() =>
  import("./pages/CreateAccount/CreateAccount.jsx")
);
const SearchResults = lazy(() =>
  import("./pages/SearchResults/SearchResults.jsx")
);
const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));

const App = () => {
  return (
    <Router>
      <Base>
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            {/* public routes */}
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/auth/login" element={<Login />}></Route>
            <Route
              exact
              path="/auth/register"
              element={<Registration />}
            ></Route>

            {/* protected route */}
            <Route
              exact
              path="/create/post"
              element={<PrivateRoute element={<CreatePost />} />}
            ></Route>
            <Route
              exact
              path="/update/post/:slug"
              element={<PrivateRoute element={<CreatePost />} />}
            ></Route>
            <Route exact path="/all/posts" element={<AllPosts />}></Route>
            <Route path="/posts/search" element={<SearchResults />} />
            <Route exact path="/post/:slug" element={<Detail />}></Route>
            <Route
              exact
              path="/:slug"
              element={<PrivateRoute element={<Profile />} />}
            ></Route>
          </Routes>
        </Suspense>
      </Base>
    </Router>
  );
};

export default App;
