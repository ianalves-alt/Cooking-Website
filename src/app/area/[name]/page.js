// src/app/area/[name]/page.js

// Remove the "use client" directive
import Navbar from "@/comp/navbar"; // You can keep this if needed
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
  );
  const data = await response.json();

  // Create an array of area names or slugs
  return data.meals.map((meal) => ({
    name: meal.strArea.toLowerCase().replace(/\s+/g, "-"), // Change the area name to a slug
  }));
}

export default async function Area({ params }) {
  // Fetch area data
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.name.replace(/-/g, " ")}`,
  );
  const response = await res.json();

  const areaFoodInfo = response.meals || []; // Handle case where there are no meals

  return (
    <>
      <h1 className="find categorytitle">
        {params.name.replace(/-/g, " ")} food
      </h1>
      <div className="cardInfoOa">
        {areaFoodInfo.map((element) => (
          <Link
            className="cardBoxLink"
            href={`/${element.idMeal}`} // Use element.idMeal directly for the link
            key={element.idMeal} // Use a unique key for each element
          >
            <div className="cardBox">
              <Image
                className="cardInfoImage"
                src={element.strMealThumb}
                alt={element.strMeal}
                width={150} // Set width and height for better performance
                height={150}
              />
              <div className="cardInfo">
                <div className="cardInfoTitle">{element.strMeal}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
