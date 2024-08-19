import Recepie from "@/comp/recepie";

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

  for (const category of categories) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await res.json();

    if (data.meals) {
      allMeals.push(...data.meals);
    }
  }

  // Return only the list of IDs for static generation
  return allMeals.map((meal) => ({
    recepie: meal.idMeal.toString(),
  }));
}

const RecepiePage = async ({ params }) => {
  const id = params.recepie;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );

    // Handle non-200 responses
    if (!response.ok) {
      console.error(`API returned an error: ${response.statusText}`);
      return <div>Failed to load recipe. Please try again later.</div>;
    }

    const data = await response.json();

    // Handle invalid JSON response
    if (!data || !data.meals || data.meals.length === 0) {
      console.error("Invalid JSON received:", data);
      return <div>Recipe not found.</div>;
    }

    return (
      <>
        <Recepie id={data.meals[0].idMeal} />
      </>
    );
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return <div>Error loading the recipe. Please try again later.</div>;
  }
};

export default RecepiePage;
