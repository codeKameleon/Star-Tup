import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Contact from "./components/Contact";
import User from "./components/User";
import Conversation from "./components/Conversation";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="w-full h-screen bg-[#111b21]">
      <CookiesProvider>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/app" />} />
          <Route exact path="/app" element={<Home />} />
          <Route exact path="/app/register" element={<Register />} />
          <Route exact path="/app/login" element={<Login />} />
          <Route exact path="/app/chat" element={<Chat />} />
          <Route exact path="/app/contact" element={<Contact />} />
          <Route exact path="/app/user" element={<User />} />
          <Route exact path="/app/chat/:id/:name/:receiverId" element={<Conversation />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;