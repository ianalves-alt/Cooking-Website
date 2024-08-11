import { FaStar } from "react-icons/fa";
import "@/styles/categories.css";
import Image from "next/image";
import barcode from "../../public/editedBarcode.png";
import "@/styles/about.css";
import crown from "../../public/pikaso_enhance__vivid_2K_Art_r_c.jpg";
import Link from "next/link";
import barcodeTwo from "../../public/barcode3.jpg";
import barbed from "../../public/barbed2.png";
export default function About() {
  return (
    <>
      <div className="containerRecepies">
        <div className="coa">
          <div className="aboutHeroOa">
            <div>
              <h1 className="categoriesTitle">About</h1>
              <p className="aboutSub">
                Welcome to our Recipe Website, your go-to destination for
                discovering, sharing, and enjoying delicious recipes from around
                the world. Our mission is to inspire culinary creativity and
                make cooking an enjoyable experience for everyone, regardless of
                skill level.
              </p>
            </div>
            <div className="flexAb">
              <div className="right">
                <div>
                  About <div>section</div>
                </div>{" "}
              </div>
              <div className="right">
                <div>choose</div>
                <div>your</div>
                <div>recepie</div>
                <Image
                  width={184}
                  height={50}
                  alt="Picture of the author"
                  src={barcode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutBody">
        <div className="aboutTitle">
          What Is This Website?
          <FaStar className="star" />
          <div className="subtitleAbout">
            This website is a sophisticated recipe platform developed using
            Next.js. It aims to provide users with a seamless and intuitive
            experience for discovering, saving, and sharing culinary recipes.
            Leveraging dynamic routing, server-side rendering, and API
            integrations, it ensures fast and efficient data handling. The
            responsive and visually appealing user interface, built with modern
            JavaScript and CSS techniques, guarantees accessibility and
            usability across various devices. This project showcases my
            proficiency in full-stack web development, particularly with
            JavaScript and Next.js, and demonstrates my commitment to creating
            high-quality, user-centric web applications.
          </div>
        </div>
        <div className="gridContainer">
          <div className="item1">
            <Image
              className="crown"
              width={420}
              height={250}
              alt="crown"
              src={crown}
            />
            <div className="classTitle">Built Entirely With Nextjs</div>
            <div className="classText">
              This website leverages the latest technologies to ensure the
              highest quality of development. It features dynamic routing,
              server-side rendering, and static site generation, fully utilizing
              the capabilities of Next.js. Additionally, it integrates
              seamlessly with modern APIs and services, providing a robust and
              scalable solution for both developers and end-users. The
              responsive design ensures an optimal viewing experience across all
              devices.
            </div>
          </div>
          <div className="item2">
            <Image
              className="barcode2"
              width={420}
              height={150}
              alt="crown"
              src={barcodeTwo}
            />
            <div className="classTitle">Data Fetched From Recepie Api</div>
            <div className="classText">
              The recipe data is obtained through an API call to a dedicated
              recipe service{" "}
              <Link href="https://www.themealdb.com" passHref={true}>
                theMealDb.
              </Link>{" "}
              Initially, we send a request to the API endpoint, which returns a
              JSON response containing a wide array of recipes. Once we receive
              the data, we manipulate it by filtering out recipes based on
              specific criteria, such as category and area.
            </div>
          </div>
          <div className="item3">
            <Image
              className="barbed"
              width={750}
              height={160}
              alt="crown"
              src={barbed}
            />
            <div className="classTitle">
              User-Friendly and Intuitive Interface
            </div>
            <div className="classText">
              This website is designed with a strong focus on user experience,
              ensuring that navigation is straightforward and enjoyable. The
              intuitive layout allows users to effortlessly search for recipes,
              save their favorites, and share them with others. Enhanced by
              modern JavaScript and CSS techniques, the interface is both
              visually appealing and highly functional. The user-centric
              approach ensures that both novice cooks and seasoned chefs can
              easily find and follow recipes, making cooking an enjoyable and
              accessible activity for everyone.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
