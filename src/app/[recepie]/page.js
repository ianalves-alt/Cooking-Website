// src/app/[recepie]/page.js
import Recepie from "@/comp/recepie";

export async function generateStaticParams() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  ); // Fetch a list of recipes
  const data = await response.json();

  // Create an array of recipe IDs or slugs
  return data.meals.map((meal) => ({
    recepie: meal.idMeal.toString(), // Change this according to how you want the URL to be structured
  }));
}

// Mark this component as a Client Component
const Recepiepage = ({ params }) => {
  const id = params.recepie;

  return (
    <>
      <Recepie id={id} />
    </>
  );
};

export default Recepiepage;
