import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pokemon View",
  description: "pokemon layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
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
      </body>
    </html>
  );
}
