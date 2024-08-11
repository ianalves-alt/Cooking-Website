// src/comp/AreaMeals.js
"use client"; // This component is a Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AreaMeals({ category }) {
  const [areaFoodInfo, setAreaFoodInfo] = useState([]);

  useEffect(() => {
    const fetchArea = async () => {
      const req = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.replace(/-/g, " ")}`,
      );

      const response = await req.json();
      setAreaFoodInfo(response.meals || []);
    };
    fetchArea();
  }, [category]);

  return (
    <div className="cardInfoOa">
      {areaFoodInfo.map((element) => (
        <Link
          className="cardBoxLink"
          href={`/${element.idMeal}`}
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
  );
}
