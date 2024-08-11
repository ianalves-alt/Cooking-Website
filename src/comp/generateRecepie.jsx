"use client";
import { useEffect, useState } from "react";
import "@/styles/generate.css";
import Link from "next/link";
import "@/styles/fridge.css";
import Image from "next/image";

export default function GenerateRecipes({ filteredingredients }) {
  const [ingredientStr, setIngredientStr] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [partialMeals, setPartialMeals] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [noMealsFound, setNoMealsFound] = useState(false); // New state for no meals found

  useEffect(() => {
    // Convert filtered ingredients to lower case and trim spaces
    const ingredients = filteredingredients.map((element) =>
      element.strIngredient.toLowerCase().trim(),
    );
    setIngredientStr(ingredients);
    console.log(ingredients, "Updated IngredientStr");
  }, [filteredingredients]);

  const fetchAllMeals = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const allMeals = [];
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (const letter of alphabet) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
        );
        const data = await response.json();

        if (data.meals) {
          allMeals.push({ letter, data: data.meals });
          console.log(`Meals for ${letter}:`, data.meals);
        }
      } catch (error) {
        console.error(`Error fetching meals for ${letter}: `, error);
      }
    }

    setAllRecipes(allMeals);
    setIsGenerated(true); // Set the flag to true after fetching
    setLoading(false); // Set loading to false after fetching
  };

  const filterMealsByIngredients = () => {
    const matchingMeals = [];
    const partialMeals = [];

    allRecipes.forEach((recipe) => {
      recipe.data.forEach((meal) => {
        const mealIngredients = Array.from(
          { length: 20 },
          (_, i) => meal[`strIngredient${i + 1}`],
        )
          .filter(Boolean)
          .map((ingredient) => ingredient.toLowerCase().trim());

        console.log(meal.strMeal, "Meal Ingredients:", mealIngredients);

        const matchedIngredientsCount = mealIngredients.filter((ingredient) =>
          ingredientStr.includes(ingredient),
        ).length;

        const matchPercentage =
          (matchedIngredientsCount / mealIngredients.length) * 100;
        console.log(meal.strMeal, "Match Percentage:", matchPercentage);

        if (matchedIngredientsCount === mealIngredients.length) {
          matchingMeals.push(meal);
        } else if (matchPercentage >= 70) {
          partialMeals.push(meal);
        }
      });
    });

    console.log(matchingMeals, "Matching Meals");
    console.log(partialMeals, "Partial Matches");

    setFilteredMeals(matchingMeals);
    setPartialMeals(partialMeals);

    // Set noMealsFound state based on the results
    setNoMealsFound(matchingMeals.length === 0 && partialMeals.length === 0);
  };

  const handleGenerateRecipes = () => {
    fetchAllMeals();
  };

  useEffect(() => {
    if (isGenerated) {
      filterMealsByIngredients();
    }
  }, [allRecipes, ingredientStr, isGenerated]);

  return (
    <div>
      <div className="buttonsoa">
        <Link className="linkGoto" href={"/fridge/InsideFridge"}>
          <div className="buttonFlex">
            <button className="goToFridge"> Add to Fridge</button>
          </div>
        </Link>
        <button onClick={handleGenerateRecipes} className="goToFridge">
          Generate Recipes
        </button>
      </div>
      {loading && <p>Loading...</p>} {/* Loading message */}
      {/* Show no meals found message only after loading is false */}
      {!loading && noMealsFound && (
        <p>No meals found with the selected ingredients.</p>
      )}
      <div className="generateOa">
        <div>
          <h4>Filtered Recipes (Exact Matches)</h4>
          <ul>
            {filteredMeals.map((meal) => (
              <Link key={meal.idMeal} href={`/${meal.idMeal}`}>
                <div className="card">
                  <li>
                    <h3>{meal.strMeal}</h3>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                  </li>
                </div>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h4>Partial Recipes (At least 70% Match)</h4>
          <ul>
            {partialMeals.map((meal) => (
              <div key={meal.idMeal} className="card">
                <li>
                  <h3>{meal.strMeal}</h3>
                  <Image src={meal.strMealThumb} alt={meal.strMeal} />
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
