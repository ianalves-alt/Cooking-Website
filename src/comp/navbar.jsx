import "@/styles/navbar.css";
import Link from "next/link";

import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
export default function Navbar() {
  return (
    <>
      {" "}
      <nav className="navbar">
        <div className="title">
          <Link className="title" href="/">
            wellshop
          </Link>
        </div>
        <div className="classes">
          <div>
            <Link href="/categories" className="categories">
              categories
            </Link>
          </div>
          <div>about</div>
          <div>recepies</div>
        </div>
        <div className="search">
          <button>
            <Link href="/search">
              <FaSearch className="icon" />
            </Link>{" "}
          </button>
          <button>
            <Link href="/likes">
              <FaRegHeart style={{ color: "white", fontSize: "1.5rem" }} />
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}
