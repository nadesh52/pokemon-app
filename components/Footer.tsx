import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="__footer">
        <div className="__footer-icon --flex-row --justify-center --center">
          <div>
            copyright
            <FontAwesomeIcon icon={faCopyright} />
          </div>
          <div className="--flex-row --gap-20">
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
      </div>
    </footer>
  );
};

export default Footer;
