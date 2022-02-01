import { Route, Routes } from "react-router-dom";
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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/chat/:id/:name/:receiverId" element={<Conversation />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;