import React from "react";
import "./LandingPage.css";
import logo from "../assets/logos/pokeball_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section className="__landing">
      <nav className="__nav --row">
        <img className="__logo" src={logo} />
        <div className="__search-box">
          <input
            className="__search"
            type="text"
            placeholder="search by number"
          />
        </div>
        <span className="__menu" onClick={() => navigate("/p")}>
          table
        </span>
        <span className="__menu">menu2</span>
        <span className="__menu">menu3</span>
      </nav>
      <header className="__header-container">
        <div className="__container --margin-btm">
          <div className="--inner-container">
            <span className="__title">Ho-Oh</span>
            <div id="__type-container">
              <div className="__type --fire">fire</div>
              <div className="__type --flying">flying</div>
            </div>
            <span className="__sub-title">
              Along with Lugia, it is part of the tower duo. It is often viewed
              as the leader of the Legendary beasts.
            </span>
            <div id="__var">
              <img src="https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_250.png" />
              <img src="https://archives.bulbagarden.net/media/upload/d/d5/Spr_b_5b_250.png" />
              <img src="https://archives.bulbagarden.net/media/upload/1/14/Spr_5b_250_s.png" />
              <img src="https://archives.bulbagarden.net/media/upload/c/c4/Spr_b_5b_250_s.png" />
            </div>
          </div>
          <div className="--inner-container">
            <div className="--inner">
              <img
                src="https://www.serebii.net/pokemon/art/250.png"
                width={400}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="__main-container">
        {/* <div className="--dark"></div> */}
        <div className="__container">
          <div className="--inner-container">
            <div className="--inner">
              <img src="https://www.placehold.co/350/f08030/000000" />
            </div>
          </div>
          <div className="__body-right-box">
            <span className="__detail">
              Ho-Oh is an avian Pokémon resembling a phoenix and a peacock. Its
              feathers are predominantly gold and red, with yellow
              tail-feathers, a white underside, and green feathers at the tip of
              its wings. Ho-Oh has a green stripe on its neck, a yellow beak,
              black rings around its red eyes, and a feathered, yellow crest on
              its head. Ho-Oh's wings are prismatic, causing it to trail a
              rainbow behind it. It has darkly colored feet and legs with four
              toes and long talons.
            </span>
            <div className="__button --align-right">find next</div>
          </div>
        </div>
      </main>
      <footer>
        <div className="__footer">
          <div className="--row --flex-center">
            <div>
              <FontAwesomeIcon icon={faCopyright} />
              copyright
            </div>
            <div className="__menu">
              <FontAwesomeIcon icon={faTwitter} size="2xl" />
            </div>
            <div className="__menu">
              <FontAwesomeIcon icon={faLinkedin} size="2xl" />
            </div>
            <div className="__menu">
              <FontAwesomeIcon icon={faGithub} size="2xl" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
