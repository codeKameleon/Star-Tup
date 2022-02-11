import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Contact from "./components/Contact";
import User from "./components/User";
import Conversation from "./components/Conversation";
import { CookiesProvider } from 'react-cookie';
import Notfound from "./components/Notfound";

function App() {
  return (
    <div className="w-full h-screen bg-[#111b21]">
      <CookiesProvider>
        <Routes>
          {/* Redirect */}
          <Route path="*" element={<Notfound />} />
          {/* Landing page */}
          <Route exact path="/" element={<Navigate replace to="/app" />} />
          <Route exact path="/app/" element={<Home />} />
          {/* Register */}
          <Route exact path="/app/register" element={<Register />} />
          <Route exact path="/regiser" element={<Navigate replace to="/app/register" />} />
          {/* Login */}
          <Route exact path="/app/login" element={<Login />} />
          <Route exact path="/login" element={<Navigate replace to="/app/login" />} />
          {/* Landing page after login & all chat page */}
          <Route exact path="/app/chat" element={<Chat />} />
          <Route exact path="/chat" element={<Navigate replace to="/app/chat" />} />
          {/* All user */}
          <Route exact path="/app/contact" element={<Contact />} />
          <Route exact path="/contact" element={<Navigate replace to="/app/contact" />} />
          {/* User profil */}
          <Route exact path="/app/user" element={<User />} />
          <Route exact path="/user" element={<Navigate replace to="/app/contact" />} />
          {/* Conversation with conversation id / other member name / other member id*/}
          <Route exact path="/app/chat/:id/:name/:receiverId" element={<Conversation />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;