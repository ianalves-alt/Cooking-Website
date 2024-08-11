"use client";
import Navbar from "@/comp/navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Area({ params }) {
  const [areaFoodInfo, setAreaFoodInfo] = useState([]);
  useEffect(() => {
    const fetchArea = async () => {
      const req = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`,
      );

      const response = await req.json();

      setAreaFoodInfo(response.meals);
    };
    fetchArea();
  }, [params.category]);
  console.log(areaFoodInfo);
  console.log(params.name);
  return (
    <>
      <h1 className="find categorytitle">{params.category} food</h1>
      <div className="cardInfoOa">
        {areaFoodInfo.map((element, i) => (
          <Link
            className="cardBoxLink"
            href={`/${areaFoodInfo[i].idMeal}`}
            key={i}
          >
            <div className="cardBox">
              <Image
                className="cardInfoImage"
                src={areaFoodInfo[i].strMealThumb}
                alt={areaFoodInfo[i].strMeal}
              />
              <div className="cardInfo">
                <div className="cardInfoTitle">{areaFoodInfo[i].strMeal}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
