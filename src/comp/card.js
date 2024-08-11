"use client";
import { useState, useEffect } from "react";
import "@/styles/cards.css";
import Link from "next/link";
import "@/styles/mainPageQuery.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function Card() {
  const [likedItems, setLikedItems] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("likedItems");
      return data ? new Set(JSON.parse(data)) : new Set();
    }
    return new Set();
  });

  const [messageVisibleFor, setMessageVisibleFor] = useState(null);
  const [main, setMain] = useState([]);
  const [likeditemsarray, setlikeditemsarray] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("likeditemarray");
      if (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          return [];
        }
      }
      return [];
    }
    return [];
  });

  const [length, setLength] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("likeditemarrayLength");
      if (data) {
        try {
          return parseInt(data, 10); // Convert to number
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          return 0;
        }
      }
      return 0;
    }
    return 0;
  });

  useEffect(() => {
    const fetchData = async () => {
      const meals = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php",
        );
        const data = await res.json();
        meals.push({
          image: data.meals[0].strMealThumb,
          title: data.meals[0].strMeal,
          area: data.meals[0].strArea,
          category: data.meals[0].strCategory,
          id: data.meals[0].idMeal,
        });
      }
      setMain(meals);
    };

    fetchData();
  }, []);

  const handleHeartClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    setLikedItems((prevLikedItems) => {
      const newLikedItems = new Set(prevLikedItems);
      let newArray = [...likeditemsarray];
      let messageText = "Added to Liked Recipes!";

      if (newLikedItems.has(id)) {
        newLikedItems.delete(id);
        newArray = newArray.filter((itemId) => itemId !== id);
        messageText = "Removed recipe";
      } else {
        newLikedItems.add(id);
        newArray.push(id);
      }

      setlikeditemsarray(newArray);
      setLength(newArray.length);

      // Show message for specific card
      setMessageVisibleFor({ id, message: messageText });
      setTimeout(() => setMessageVisibleFor(null), 3000);

      return newLikedItems;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("likeditemarrayLength", length);
    }
  }, [length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "likeditemarray",
        JSON.stringify(likeditemsarray),
      );
    }
  }, [likeditemsarray]);

  return (
    <>
      <p className="length"> {length}</p>
      <div className="cardInfoOa">
        {main.map((element, i) => (
          <div className="cardBoxWrapper" key={i}>
            <Link className="cardBoxLink" href={`/${element.id}`}>
              <div className="cardBox">
                <Image
                  className="cardInfoImage"
                  src={element.image}
                  alt={element.title}
                  width={500} // Set appropriate width and height
                  height={300} // Adjust to maintain the aspect ratio
                />
                <div className="cardInfo">
                  <div className="cardInfoTitle">{element.title}</div>
                  <div className="cardInfoArea">
                    Area:{" "}
                    <div className="category">
                      <Link
                        className="categoryLink"
                        href={`/area/${element.area}`}
                      >
                        {element.area}
                      </Link>
                    </div>
                  </div>
                  <div className="cardInfoCategory">
                    Category:{" "}
                    <div className="category">
                      <Link
                        className="categoryLink"
                        href={`/category/${element.category}`}
                      >
                        {element.category}
                      </Link>
                    </div>
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
