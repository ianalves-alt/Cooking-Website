import React, { useState, useEffect } from "react";
import "@/styles/cardFridge.css";
import Image from "next/image";

export default function DisplayFridgeItems({
  filteredItems,
  setFilteredItems,
  length,
  setCondition,
}) {
  const [ingredientImages, setIngredientImages] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const ingredientImagePromises = filteredItems.map(async (ingredient) => {
        const req = await fetch(
          `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`,
        );

        // For images, we don't need to call res.json(), we just need the URL.
        return { ingredient: ingredient.strIngredient, url: req.url };
      });

      const fetchedImages = await Promise.all(ingredientImagePromises);
      const images = fetchedImages.reduce((acc, curr) => {
        acc[curr.ingredient] = curr.url;
        return acc;
      }, {});

      setIngredientImages(images);
    };

    fetchdata();
  }, [filteredItems]);

  const handleDelete = (ingredientToDelete) => {
    if (filteredItems.length === 1) {
      window.localStorage.removeItem("FridgeItems");
      setCondition(false); // Ensure setCondition is defined and used correctly
    }
    const updatedItems = filteredItems.filter(
      (item) => item.strIngredient !== ingredientToDelete,
    );
    setFilteredItems(updatedItems);
    window.localStorage.setItem("FridgeItems", JSON.stringify(updatedItems));
  };
  return (
    <>
      <div className="cardOa">
        {filteredItems.map((element, id) => (
          <div key={id}>
            <li className="cardIngredient">
              <div className="flexcard">
                {ingredientImages[element.strIngredient] && (
                  <Image
                    className="ingImage"
                    src={ingredientImages[element.strIngredient]}
                    alt={element.strIngredient}
                    width={100}
                    height={100}
                  />
                )}
                {element.strIngredient}
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(element.strIngredient)}
                >
                  Remove
                </button>
              </div>
            </li>
          </div>
        ))}
      </div>
    </>
  );
}
