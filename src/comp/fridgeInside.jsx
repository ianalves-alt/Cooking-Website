"use client";
import "@/styles/FridgeInside.css";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PiArrowUUpLeftBold } from "react-icons/pi";

export default function FridgeInsideComponent() {
  const [fridge, setFridge] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState({});
  const [fridgeItems, setFridgeItems] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("FridgeItems");
      if (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.log(error);
          return [];
        }
      }
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      );
      const res = await req.json();
      const data = res.meals;
      setFridge(data);
      console.log(data);
    };

    fetchData();
  }, []);

  function handleAdd(id) {
    if (!fridgeItems.includes(id)) {
      setAddedIngredients((prev) => ({
        ...prev,
        [id]: true,
      }));

      setTimeout(() => {
        setAddedIngredients((prev) => ({
          ...prev,
          [id]: false,
        }));
      }, 3000);

      setFridgeItems((f) => [...f, id]);
    } else {
      alert("This ingredient is already in the fridge!");
    }
  }

  useEffect(() => {
    window.localStorage.setItem("FridgeItems", JSON.stringify(fridgeItems));
  }, [fridgeItems]);

  const filteredFridge = fridge.filter((element) =>
    element.strIngredient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="insOa">
        <div>
          <div className="insTitle">
            <Link href={"/fridge"}>
              <div className="back">
                <PiArrowUUpLeftBold /> Get back
              </div>
            </Link>
            Available Ingredients{" "}
            <p className="fridgeLen">({filteredFridge.length})</p>
          </div>
          <div className="left">
            <div className="searchContainer">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                className="searchInput"
              />
            </div>

            <div className="instructions">Click To add to Fridge!</div>
          </div>
          <div className="cardOaInside">
            <div>
              {filteredFridge.map((element, index) => (
                <button className="button" key={element.idIngredient}>
                  <div className="added">
                    {addedIngredients[element.idIngredient] && (
                      <p>added to fridge!</p>
                    )}
                  </div>
                  <div
                    className="card"
                    onClick={() => handleAdd(element.idIngredient)}
                  >
                    <li className="carditem">{element.strIngredient}</li>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        {filteredFridge.length == 0 ? (
          <p className="notFound">No Ingredient Found</p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
