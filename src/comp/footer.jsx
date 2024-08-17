import "@/styles/footer.css";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <div className="footerOa">
        <div className="title">WellShop</div>
        <div>
          <ul className="links">
            <li>
              <FaGithub style={{ fontSize: "1.3rem" }} />
            </li>
            <li>
              <FaInstagram style={{ fontSize: "1.3rem" }} />
            </li>
            <li>
              <FaYoutube style={{ fontSize: "1.3rem" }} />
            </li>
            <li>
              <FaWhatsapp style={{ fontSize: "1.3rem" }} />
            </li>
            <li>
              <FaLinkedin style={{ fontSize: "1.3rem" }} />
            </li>
          </ul>
        </div>

        <div className="rights">All rights reserved to &copy;iWell</div>
      </div>
    </>
  );
}
