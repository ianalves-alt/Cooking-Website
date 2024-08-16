"use client";
import "@/styles/navbar.css";
import Link from "next/link";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClassName = (href) => {
    return pathname === href ? "categories active" : "categories";
  };

  return (
    <>
      <nav className="navbar">
        <div className="title">
          <Link className="title" href="/">
            wellshop
          </Link>
        </div>
        <div className="classes">
          <div>
            <Link
              href="/categories"
              className={getLinkClassName("/categories")}
            >
              Categories
            </Link>
          </div>
          <div>
            <Link href="/fridge" className={getLinkClassName("/fridge")}>
              Fridge
            </Link>
          </div>
          <div>
            <Link href="/recepies" className={getLinkClassName("/recepies")}>
              Recepies
            </Link>
          </div>
          <div>
            <div>
              <Link href="/about" className={getLinkClassName("/about")}>
                About
              </Link>
            </div>
          </div>
        </div>
        <div className="search">
          <button>
            <Link href="/search">
              <FaSearch className="icon" />
            </Link>
          </button>
          <button className="likebutton">
            <Link href="/likes">
              <FaRegHeart style={{ color: "white", fontSize: "1.5rem" }} />
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}
