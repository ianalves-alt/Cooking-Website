import Recepie from "@/comp/recepie";

const RecepiePage = async ({ params }) => {
  const id = params.recepie;

  console.log(params.recepie);
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
