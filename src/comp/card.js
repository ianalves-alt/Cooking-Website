"use client";
import { useState, useEffect } from "react";
import "@/styles/cards.css";
import Link from "next/link";
import "@/styles/mainPageQuery.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Card() {
  const [likedItems, setLikedItems] = useState(new Set()); // Use a Set to track liked card IDs

  const [main, setMain] = useState([]);
  const [likeditemsarray, setlikeditemsarray] = useState(() => {
    const data = window.localStorage.getItem("likeditemarray");
    if (data) {
      try {
        // Parse JSON safely
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        return [];
      }
    }
    return []; // Default to an empty array if no data in local storage
  });
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

  const handleHeartClick = (e, id) => {
    e.stopPropagation(); // Prevents click from bubbling up
    e.preventDefault(); // Prevents default behavior
    console.log("Heart icon clicked", id);

    setLikedItems((prevLikedItems) => {
      const newLikedItems = new Set(prevLikedItems);
      if (newLikedItems.has(id)) {
        newLikedItems.delete(id); // Remove from set if already liked
      } else {
        newLikedItems.add(id); // Add to set if not liked
      }
      return newLikedItems; // Return the updated Set
    });
    setlikeditemsarray((laa) => [...laa, id]);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "likeditemarray",
      JSON.stringify(likeditemsarray),
    );
  }, [likeditemsarray]);

  return (
    <>
      <div className="cardInfoOa">
        {main.map((element) => (
          <div className="cardBoxWrapper" key={element.id}>
            <Link className="cardBoxLink" href={`/${element.id}`}>
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
