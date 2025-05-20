// Home.js
import React from "react";
import "./Home.css";
import bgImage from "../assets/rrsimage.jpeg"; // adjust path if needed

const Home = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="hero-content">
        <h1>Welcome to EasyReserve!!</h1>
        <p>Your table is just a click away!</p>
      </div>
    </div>
  );
};

export default Home;
