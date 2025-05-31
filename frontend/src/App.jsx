import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Button from "./components/button";
import Browsequestions from "./components/browsequestions";
import Askquestion from "./components/Askquestion";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === "/Register" || location.pathname === "/Login";

  return (
    <>
      <nav>
        <div className="logo">LOGO</div>
        <div className="links">
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? { color: "#ed6a5a" } : {})}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Questions"
                style={({ isActive }) => (isActive ? { color: "#ed6a5a" } : {})}
              >
                Browse Questions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Ask-question"
                style={({ isActive }) => (isActive ? { color: "#ed6a5a" } : {})}
              >
                Ask Questions
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="auth">
          <div className="signup">
            <NavLink to="/Register"><Button text="Register" color="#ED6A5A" /></NavLink>
          </div>
          <div className="signin">
            <NavLink to="/Login"><Button text="Login" color="black" /></NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Questions" element={<Browsequestions />} />
          <Route path="/Ask-question" element={<Askquestion />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>

      {!hideFooter && (
        <footer>
          <div className="footer">
            <p>
              © {new Date().getFullYear()} Q&A Community. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

export default App;
