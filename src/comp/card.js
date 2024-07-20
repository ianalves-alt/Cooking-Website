"use client";
import { useState, useEffect } from "react";
import "@/styles/cards.css";
import Link from "next/link";
import "@/styles/mainPageQuery.css";

export default function Card() {
  const [main, setMain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < 10; i++) {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php",
        );
        const data = await res.json();
        setMain((m) => [
          ...m,
          {
            image: data.meals[0].strMealThumb,
            title: data.meals[0].strMeal,
            area: data.meals[0].strArea,
            category: data.meals[0].strCategory,
            id: data.meals[0].idMeal,
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="cardInfoOa">
        {main.map((element, index) => (
          <Link className="cardBoxLink" href={`/${element.id}`} key={index}>
            <div className="cardBox">
              <img
                className="cardInfoImage"
                src={element.image}
                alt={element.title}
              />
              <div className="cardInfo">
                <div className="cardInfoTitle">{element.title}</div>
                <div className="cardInfoArea">Area: {element.area}</div>
                <div className="cardInfoCategory">
                  Category: {element.category}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
