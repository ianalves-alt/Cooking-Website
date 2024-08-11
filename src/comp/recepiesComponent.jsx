import "../styles/recepiesComponent.css";
import "../styles/categories.css";
import Image from "next/image";
import barcode from "../../public/editedBarcode.png";
import Card from "./card";

export default function RecepiesComponent() {
  return (
    <>
      <div className="containerRecepies">
        <div className="heroText">
          <div className="uiImprovement">
            Food <div>Recepies</div>
          </div>
          <div className="categories2">
            <p className="foodtitle">recepies title</p>
            <h1 className="categoriesTitle">recepies</h1>
            <p className="subtitleCategories">
              An ample variety of recepies for all tastebuds
            </p>
          </div>
          <div className="barcode">
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

      <h1 className="rand">few random foods</h1>
      <Card />
    </>
  );
}
