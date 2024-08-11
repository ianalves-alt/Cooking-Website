// src/app/category/[category]/page.js
import Navbar from "@/comp/navbar";
import AreaMeals from "@/comp/AreaMeals"; // Import the new client component

export async function generateStaticParams() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php", // Fetch a list of categories
  );
  const data = await response.json();

  // Create an array of category slugs
  return data.categories.map((category) => ({
    category: category.strCategory.toLowerCase().replace(/\s+/g, "-"), // Create a slug for the category
  }));
}

export default function Area({ params }) {
  return (
    <>
      <h1 className="find categorytitle">{params.category} food</h1>
      <AreaMeals category={params.category} />{" "}
      {/* Pass category to the client component */}
    </>
  );
}
