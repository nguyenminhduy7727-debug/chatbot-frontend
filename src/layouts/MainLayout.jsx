import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Chatbot from '../components/Chatbot/Chatbot'; // Import Chatbot ở đây

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}