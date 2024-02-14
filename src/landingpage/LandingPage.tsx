import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <section className="__landing">
      <nav className="__nav">
        <img className="__logo" src="https://placehold.co/70" />
        <span>menu1</span>
        <span>menu2</span>
        <span>menu3</span>
      </nav>
      <main className="__main">
        <div className="__header">
          <div className="__left-container">
            <div id="__left-box">
              <h1>Ho-Oh</h1>
              <h3>
                Along with Lugia, it is part of the tower duo. It is often
                viewed as the leader of the Legendary beasts.
              </h3>
              <div id="--button">im button click me</div>
            </div>
          </div>
          <div className="__right-container">
            <div id="__right-box">
              <img
                src="https://www.serebii.net/pokemon/art/250.png"
                width={450}
              />
            </div>
          </div>
        </div>
        <div id="__var">
          <img src="https://www.serebii.net/pokearth/sprites/dp/250.png" />
          <img src="https://www.serebii.net/pokearth/sprites/hgss/250.png" />
          <img src="https://www.serebii.net/Shiny/DP/250.png" />
          <img src="https://www.serebii.net/Shiny/HGSS/250.png" />
        </div>
        <div className="__body">body</div>
      </main>
    </section>
  );
};

export default LandingPage;
