import Inputbox from "@/comp/inputbox";
import "@/styles/navbar.css";
import "@/styles/global.css";
import Hero from "@/comp/hero";
import MainBody from "@/comp/mainBody";

export default function Page() {
  return (
    <>
      <header></header>
      <div>
        <Hero />
      </div>
      <div>
        <MainBody />
      </div>
      <div></div>

      <Inputbox />
    </>
  );
}
