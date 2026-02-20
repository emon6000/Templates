import React, { useState } from "react";
import "./Style.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Home = () => {
  const [action, setAction] = useState("");
  
  // State to hold form data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NEW: State to track the currently logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  const registerLink = () => setAction("active");
  const loginLink = () => setAction("");

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://login-register-logout.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if(response.ok) {
          // Success! Set the user in state and clear the password field
          setLoggedInUser(data.user.username);
          setPassword(""); 
      } else {
          alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Handle Register Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://login-register-logout.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      
      if(response.ok) {
          alert("Registration successful! Please login.");
          loginLink(); 
          setPassword(""); // Clear password field for safety
      } else {
          alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // NEW: Handle Logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername(""); // Clear username so it's fresh for the next login
  };

  // NEW: Conditional Rendering
  // If a user is logged in, only show this Welcome Screen
  if (loggedInUser) {
    return (
      <div className="wrapper">
        <div className="form-box">
          <h1 style={{ color: "#fff" }}>Welcome, {loggedInUser}!</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If NO user is logged in, show the normal Login/Register forms
  return (
    <div className={`wrapper ${action}`}>
      {/* LOGIN FORM */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
          </div>
        </form>
      </div>

      {/* REGISTRATION FORM */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> I agree to the terms & conditions</label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;