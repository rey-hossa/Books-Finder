import React from 'react';
import './Home.css';
import Search from "./Search";
import logo from "./logo/logo.svg"

function Home() {
  return (
    <div className="home">
      <img className="home_logo" src={logo} /> {/* Logo del sito*/ }
      <Search/>
      <p>Search for any existing book!</p>
    </div>
  );
}

export default Home;
