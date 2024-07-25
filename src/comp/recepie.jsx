"use client";
import { useEffect, useState } from "react";
import "@/styles/recepie.css";
import Link from "next/link";

import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Recepie({ id }) {
  const [likedItems, setLikedItems] = useState(new Set()); // Use a Set to track liked card IDs
  const [meal, setMeal] = useState(null);
  const [likeditemsarray, setlikeditemsarray] = useState(() => {
    const data = window.localStorage.getItem("likeditemarray");
    if (data) {
      try {
        // Parse JSON safely
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        return [];
      }
    }
    return []; // Default to an empty array if no data in local storage
  });
  const handleHeartClick = (e, id) => {
    e.stopPropagation(); // Prevents click from bubbling up
    e.preventDefault(); // Prevents default behavior
    console.log("Heart icon clicked", id);

    setLikedItems((prevLikedItems) => {
      const newLikedItems = new Set(prevLikedItems);
      if (newLikedItems.has(id)) {
        newLikedItems.delete(id); // Remove from set if already liked
      } else {
        newLikedItems.add(id); // Add to set if not liked
      }
      return newLikedItems; // Return the updated Set
    });
    setlikeditemsarray((laa) => [...laa, id]);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "likeditemarray",
      JSON.stringify(likeditemsarray),
    );
  }, [likeditemsarray]);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const mealData = data.meals[0];
        const ingredients = [];
        const measurements = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}`];
          const measure = mealData[`strMeasure${i}`];

          if (ingredient && ingredient.trim() !== "") {
            ingredients.push(ingredient);
            measurements.push(measure);
          }
        }

        setMeal({
          image: mealData.strMealThumb,
          title: mealData.strMeal,
          area: mealData.strArea,
          category: mealData.strCategory,
          id: mealData.idMeal,
          instructions: mealData.strInstructions,
          video: mealData.strYoutube,
          source: mealData.strSource,
          ingredients,
          measurements,
        });
      });
  }, [id]);

  if (!meal) return <div>Loading...</div>;

  return (
    <>
      <div className="recepieOa">
        <h2>{meal.title}</h2>
        <div className="recepieFlex">
          <div>
            <img className="recepieImage" src={meal.image} alt={meal.title} />
            <div className="foodInfo">
              <div className="infoElement">
                <p className="label">Category: </p>
                <p className="labelfor">{meal.category}</p>
              </div>
              <div className="infoElement">
                <p className="label">Area: </p>
                <p className="labelfor">
                  <Link className="infoLink" href={`/area/${meal.area}`}>
                    {meal.area}
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <p className="sourcetitle">Source: </p>{" "}
              <div>
                <a className="sourcelink" href={meal.source}>
                  {meal.source}
                </a>
              </div>
            </div>
            <div>
              <button
                className="heartIconWrapper"
                onClick={(e) => handleHeartClick(e, meal.id)}
                type="button"
              >
                {likedItems.has(meal.id) ? (
                  <FaHeart className="likes" />
                ) : (
                  <FaRegHeart className="likes" />
                )}
              </button>
            </div>
          </div>
          <div className="InstructionsOa">
            <h3 className="recepieInstructionsTitle">{meal.title}</h3>
            <div>
              <h4 className="labelIngredients">Ingredients: </h4>
              <dl className="ingredientsList">
                {meal.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <dt className="ingredientslike">{ingredient}</dt>
                    <dd>{meal.measurements[index]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="Instructions">{meal.instructions}</p>
            <p className="videoTitle">Here's a nice video to help you: </p>
            <br />
            <a href={meal.video} className="videoLink">
              video on {meal.title}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
