import React from "react";
import "./LandingPage.css";
import logo from "../assets/logos/pokeball_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import { useNavigate } from "react-router-dom";

const STR =
  "A legend says that its body glows in seven colors.\nA rainbow is said to form behind it when it flies.";

const LandingPage = () => {
  // const navigate = useNavigate();
  return (
    <section>
      <nav className="__nav __nav-row --flex-row">
        <div className="__search-box --flex-row">
          <a href="/">
            <img className="__logo" src={logo} />
          </a>
          <input
            className="__search"
            type="text"
            placeholder="search by number"
          />
        </div>
        <div className="__nav-menu --flex-row">
          <a href="/p" className="__menu-link">
            table
          </a>
          <span className="__menu-link">menu2</span>
          <span className="__menu-link">menu3</span>
        </div>
      </nav>
      <header className="__header-container">
        <div className="__container --margin-btm --flex-row">
          <div className="__inner-container --flex-col">
            <span className="__title">Ho-Oh</span>
            <div className="__type-container --flex-row">
              <div className="__type --fire">fire</div>
              <div className="__type --flying">flying</div>
            </div>
            <span className="__sub-title">{STR}</span>
            <div className="__var --flex-row">
              <img src="https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_250.png" />
              <img src="https://archives.bulbagarden.net/media/upload/d/d5/Spr_b_5b_250.png" />
              <img src="https://archives.bulbagarden.net/media/upload/1/14/Spr_5b_250_s.png" />
              <img src="https://archives.bulbagarden.net/media/upload/c/c4/Spr_b_5b_250_s.png" />
            </div>
          </div>
          <div className="__inner-container">
            <div className="--text-center">
              <img
                src="https://www.serebii.net/pokemon/art/250.png"
                width={350}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="__main-container">
        <div className="__container __main-top --flex-row">
          <div className="__main-nav --flex-row">
            <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
            <img src="https://www.placehold.co/100" />
          </div>
          <div className="__main-nav --flex-row">
            <img src="https://www.placehold.co/100" />
            <FontAwesomeIcon icon={faArrowRightLong} size="2xl" />
          </div>
        </div>
        <div className="__container __main-bot --flex-row">
          <div className="__inner-container --flex-center">
            <img src="https://archives.bulbagarden.net/media/upload/thumb/a/a7/PSMD_poster.png/250px-PSMD_poster.png" />
          </div>
          <div className="__body-right-box --flex-col">
            <span className="__sub-title">
              While most Pokémon resemble animals and may behave like them,
              there are many that do not resemble animals at all, taking on
              other forms such as plants, inanimate objects, machines,
              human-like forms, or other more enigmatic and exotic appearances.
            </span>
            <span className="__sub-title">
              Pokémon inhabit an extremely diverse range of habitats, ranging
              from the driest deserts to the lushest jungles, the deepest oceans
              to the highest mountains and everything else in between, even
              outer space and other dimensions.
            </span>
            <div className="__button --self-center">find more</div>
          </div>
        </div>
      </main>
      <footer>
        <div className="__footer">
          <div className="__footer-icon --flex-row --flex-center">
            <div>
              <FontAwesomeIcon icon={faCopyright} />
              copyright
            </div>
            <div className="__menu-link">
              <FontAwesomeIcon icon={faTwitter} size="2xl" />
            </div>
            <div className="__menu-link">
              <FontAwesomeIcon icon={faLinkedin} size="2xl" />
            </div>
            <div className="__menu-link">
              <FontAwesomeIcon icon={faGithub} size="2xl" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
