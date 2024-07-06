// import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Guide from "./pages/guide/guide";
import Login from "./pages/login/login.js";
import Register from "./pages/register/Register.js";
import Personel from "./pages/personal/personel";
import About from "./pages/about/about.js";
import Team from "./pages/our team/team.js";
import ConfirmCode from "./pages/confirmCode/confirmCode.js";
import Profile from "./pages/profile/Profile.js";
import Forget from "./pages/forgetpassword/Forget.js";
import LogOut from "./pages/logout/LogOut.js";
import ChangeEmail from "./pages/change_email/ChangeEmail.js";
import ConfirmChangeEmail from "./pages/confirm_change_email/ConfirmChangeEmail.js";
import UpdataProfile from "./pages/updataprofile/UpdataProfile.js";
import Posts from "./pages/posts/Posts.js";
import Postdetails from "./pages/posts/postdetials.js";
import {  useSelector } from "react-redux";
import EditPost from "./pages/posts/EditPost.js";
import QuizeQuestion from "./pages/quize/QuizeQuestion.js";
import Quize from "./pages/quize/Quize.js";
import Result from "./pages/quize/result.js";
import ResultHistory from "./pages/resulthistory/ResultHistory.js";
import Footer from "./component/footer/Footer.js";
import Navbar from "./component/NavBar/Navbar.js";

function App() {
  const posts = useSelector((state) => state.posts);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmcode" element={<ConfirmCode />} />
        <Route path="/change_email" element={<ChangeEmail />} />
        <Route path="/confirm_change_email" element={<ConfirmChangeEmail />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<Postdetails />} />
        <Route path="/edit_post/:id" element={<EditPost />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updata_profile" element={<UpdataProfile />} />
        <Route path="/quize" element={<Quize />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/personal" element={<Personel />} />
        <Route path="/about" element={<About />} />
        <Route path="/our_team" element={<Team />} />
        <Route path="/quize/" element={<Quize />} />
        <Route path="/quize/Question" element={<QuizeQuestion />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result_history" element={<ResultHistory />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
