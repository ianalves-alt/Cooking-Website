// src/components/Card.js
"use client";
import { useState, useEffect } from "react";
import "@/styles/cards.css";
import Link from "next/link";
import "@/styles/mainPageQuery.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function Card() {
  const [likedItems, setLikedItems] = useState(new Set());
  const [messageVisibleFor, setMessageVisibleFor] = useState(null);
  const [main, setMain] = useState([]);
  const [likeditemsarray, setlikeditemsarray] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem("likeditemarray");
    setlikeditemsarray(data ? JSON.parse(data) : []);
    const likedItemsSet = new Set(data ? JSON.parse(data) : []);
    setLikedItems(likedItemsSet);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const meals = await Promise.all(
        Array.from({ length: 10 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((res) => res.json())
            .then((data) => ({
              image: data.meals[0].strMealThumb,
              title: data.meals[0].strMeal,
              area: data.meals[0].strArea,
              category: data.meals[0].strCategory,
              id: data.meals[0].idMeal,
            })),
        ),
      );
      setMain(meals);
    };

    fetchData();
  }, []);

  const handleHeartClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    setLikedItems((prev) => {
      const newLikedItems = new Set(prev);
      let newArray = [...likeditemsarray];

      if (newLikedItems.has(id)) {
        newLikedItems.delete(id);
        newArray = newArray.filter((itemId) => itemId !== id);
        setMessageVisibleFor({ id, message: "Removed recipe" });
      } else {
        newLikedItems.add(id);
        newArray.push(id);
        setMessageVisibleFor({ id, message: "Added to Liked Recipes!" });
      }

      window.localStorage.setItem("likeditemarray", JSON.stringify(newArray));
      setlikeditemsarray(newArray);
      setTimeout(() => setMessageVisibleFor(null), 3000);

      return newLikedItems;
    });
  };

  return (
    <>
      <div className="cardInfoOa">
        {main.map((element, i) => (
          <div className="cardBoxWrapper" key={i}>
            <Link className="cardBoxLink" href={`/${element.id}`}>
              <div className="cardBox">
                <Image
                  className="cardInfoImage"
                  src={element.image}
                  alt={element.title}
                  width={500}
                  height={300}
                />
                <div className="cardInfo">
                  <div className="cardInfoTitle">{element.title}</div>
                  <div className="cardInfoArea">
                    Area:{" "}
                    <Link
                      className="categoryLink"
                      href={`/area/${element.area}`}
                    >
                      {element.area}
                    </Link>
                  </div>
                  <div className="cardInfoCategory">
                    Category:{" "}
                    <Link
                      className="categoryLink"
                      href={`/category/${element.category}`}
                    >
                      {element.category}
                    </Link>
                  </div>
                </div>
                {messageVisibleFor?.id === element.id && (
                  <p className="message show">{messageVisibleFor.message}</p>
                )}
                <button
                  className="heartIconWrapper"
                  onClick={(e) => handleHeartClick(e, element.id)}
                  type="button"
                >
                  {likedItems.has(element.id) ? (
                    <FaHeart className="likes" />
                  ) : (
                    <FaRegHeart className="likes" />
                  )}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
