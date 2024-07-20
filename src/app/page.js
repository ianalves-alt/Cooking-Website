import Inputbox from "@/comp/inputbox";
import { FaSearch } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import "@/styles/navbar.css";
import "@/styles/global.css";
import Hero from "@/comp/hero";
import MainBody from "@/comp/mainBody";
import Footer from "@/comp/footer";
import Navbar from "@/comp/navbar";

export default function Page() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <Hero />
      </div>
      <div>
        <MainBody />
      </div>
      <div>
        <Footer />
      </div>

      <Inputbox />
    </>
  );
}
