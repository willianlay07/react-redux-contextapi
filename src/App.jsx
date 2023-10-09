import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import PostLayout from "./components/PostLayout";
import Posts from "./pages/Posts";
import IndividualPost from "./pages/IndividualPost";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PostProvider } from "./contexts/PostProvider";
import Bank from "./pages/Bank";

export default function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="posts" element={<PostLayout />}>
            <Route index element={<Posts />} />
            <Route path=":id" element={<IndividualPost />} />
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bank" element={<Bank />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PostProvider>
  );
}
