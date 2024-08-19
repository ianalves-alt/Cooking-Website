"use client";
import { useEffect, useState } from "react";
import "@/styles/recepie.css";
import Link from "next/link";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Recepie({ id }) {
  // Initialize liked items from localStorage
  const [likedItems, setLikedItems] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("likedItems");
      return data ? new Set(JSON.parse(data)) : new Set();
    }
    return new Set();
  });

  const [meal, setMeal] = useState(null);

  const handleHeartClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    setLikedItems((prevLikedItems) => {
      const newLikedItems = new Set(prevLikedItems);
      if (newLikedItems.has(id)) {
        newLikedItems.delete(id);
      } else {
        newLikedItems.add(id);
      }

      // Update localStorage
      window.localStorage.setItem(
        "likedItems",
        JSON.stringify(Array.from(newLikedItems)),
      );

      return newLikedItems;
    });
  };

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
      })
      .catch((error) => console.error("Error fetching meal data:", error));
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
                <p className="labelfor">
                  <Link
                    className="infoLink"
                    href={`/category/${meal.category}`}
                  >
                    {meal.category}
                  </Link>
                </p>
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
            <div className="Instructions">
              <div className="instructionsTitle">Instructions</div>
              {meal.instructions}
            </div>
            <p className="videoTitle">Here is a nice video to help you: </p>
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
