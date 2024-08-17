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

  // Return the list of params for static generation
  return allMeals.map((meal) => ({
    recepie: meal.idMeal.toString(),
  }));
}

const RecepiePage = async ({ params }) => {
  const id = params.recepie;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await response.json();

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
