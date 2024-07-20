"use client";
import { useEffect, useState } from "react";
import "@/styles/recepie.css";

export default function Recepie({ id }) {
  const [meal, setMeal] = useState(null);

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
          </div>
          <div className="InstructionsOa">
            <h3 className="recepieInstructionsTitle">{meal.title}</h3>
            <div>
              <h4 className="labelIngredients">Ingredients: </h4>
              <dl className="ingredientsList">
                {meal.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <dt>{ingredient}</dt>
                    <dd>{meal.measurements[index]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="Instructions">{meal.instructions}</p>
          </div>
        </div>
      </div>
    </>
  );
}
