import Recepie from "@/comp/recepie";

// This function generates static parameters for each recipe page
export async function generateStaticParams() {
  const categories = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];

  const allMeals = [];

  // Fetching all meals for each category
  for (const category of categories) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      const data = await res.json();

      if (data.meals) {
        allMeals.push(...data.meals);
      }
    } catch (error) {
      console.error(`Error fetching meals for category ${category}:`, error);
    }
  }

  // Return the list of params for static generation
  return allMeals.map((meal) => ({
    recepie: meal.idMeal.toString(),
  }));
}

// This component fetches and displays the details of a specific recipe
const RecepiePage = async ({ params }) => {
  const id = params.recepie;

  let data;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    data = await response.json();
  } catch (error) {
    console.error(`Error fetching recipe for ID ${id}:`, error);
    return <div>Error loading recipe.</div>;
  }

  if (!data.meals || data.meals.length === 0) {
    return <div>Recipe not found.</div>;
  }

  return (
    <>
      <Recepie id={data.meals[0].idMeal} />
    </>
  );
};

export default RecepiePage;
