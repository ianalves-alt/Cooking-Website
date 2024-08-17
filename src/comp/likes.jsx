"use client";

import "@/styles/recepie.css";
import { useEffect, useState } from "react";
import "@/styles/likes.css";
import Link from "next/link";

export default function Likes() {
  const [likesArray, setLikesArray] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("likeditemarray");
      if (data) {
        try {
          setLikesArray(JSON.parse(data));
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          setLikesArray([]);
        }
      }
    }
  }, []);

  const [foodInfo, setFoodInfo] = useState([]);

  useEffect(() => {
    if (likesArray.length > 0) {
      const fetchData = async () => {
        const foodData = await Promise.all(
          likesArray.map(async (id) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            );

            const data = await res.json();

            if (!data.meals || data.meals.length === 0) {
              return null; // No meal found for this id
            }

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

            return {
              image: mealData.strMealThumb,
              title: mealData.strMeal,
              area: mealData.strArea,
              category: mealData.strCategory,
              id: mealData.idMeal,
              ingredients,
              measurements,
            };
          }),
        );

        // Filter out any null values
        const filteredFoodData = foodData.filter((item) => item !== null);

        setFoodInfo(filteredFoodData);
      };

      fetchData();
    }
  }, [likesArray]);

  const handleRemove = (id) => {
    const updatedLikesArray = likesArray.filter((itemId) => itemId !== id);
    setLikesArray(updatedLikesArray);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "likeditemarray",
        JSON.stringify(updatedLikesArray),
      );
    }
  };

  return (
    <div className="likesPage">
      <h1 className="likedRecepiesTitle">Liked Recipes</h1>
      {likesArray.length > 0 ? (
        <div>
          <p className="amount">{likesArray.length} liked recipes</p>
          <div className="likesBox">
            {foodInfo.map((element, index) => (
              <div className="likesFlex" key={element.id}>
                <img className="likedImage" src={element.image} />
                <div className="likeInfo">
                  <div className="likeInfo1">
                    <h1 className="likedTitle">{element.title}</h1>

                    <Link className="cardBoxLink" href={`/${element.id}`}>
                      <button className="seeRecepie">See Recipe</button>
                    </Link>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleRemove(element.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <h4>Ingredients</h4>
                    <dl className="ingredientsList">
                      {element.ingredients.map((ingredient, index) => (
                        <div key={index}>
                          <dt>{ingredient}</dt>
                          <dd>{element.measurements[index]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="noLikesFlex">
          <p className="noLikes">No recipes liked... :(</p>
        </div>
      )}
    </div>
  );
}
