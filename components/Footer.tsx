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
      <div className="flex flex-col items-center justify-center gap-2">
        <div>
          <span>copyright</span>
          <FontAwesomeIcon icon={faCopyright} />
        </div>

        <div className="flex items-center gap-4">
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
  );
};

export default Footer;
