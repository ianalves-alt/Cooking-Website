import "@/styles/navbar.css";
import Link from "next/link";

import { FaSearch } from "react-icons/fa";
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
          <div>lists</div>
          <div>recepies</div>
        </div>
        <div className="search">
          <button>
            <FaSearch className="icon" />
          </button>
          <button>
            <TbClipboardList className="icon" />
          </button>
        </div>
      </nav>
    </>
  );
}
