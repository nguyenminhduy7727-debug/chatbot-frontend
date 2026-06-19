import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Activities from "../pages/Activities/Activities";
import PublicServices from "../pages/Services/Services";
import Explore from "../pages/Explore/Explore";
import Login from "../pages/login/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/hoat-dong" element={<Activities />} />
        <Route path="/dich-vu-cong" element={<PublicServices />} />
        <Route path="/kham-pha" element={<Explore />} />
        <Route path="/dang-nhap" element={<Login />} />
      </Route>
    </Routes>
  );
}