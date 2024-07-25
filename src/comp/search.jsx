"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/search.css";

import { FaSearch } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Search() {
  const [input, setInput] = useState("");
  const [main, setMain] = useState([]);
  const [noMealsFound, setNoMealsFound] = useState(false);
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

  const fetchData = async () => {
    // Clear previous results and reset no meals found message
    setMain([]);
    setNoMealsFound(false);

    if (input.trim() === "") {
      return; // Exit early if input is empty
    }

    let searchUrl;

    // Check if input is a single letter for category search
    if (input.length === 1) {
      searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    } else {
      searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }

    try {
      const res = await fetch(searchUrl);
      const data = await res.json();

      if (data.meals) {
        // Map data to format needed for main state
        const meals = data.meals.map((meal) => ({
          image: meal.strMealThumb,
          title: meal.strMeal,
          area: meal.strArea,
          category: meal.strCategory,
          id: meal.idMeal,
        }));

        setMain(meals);
      } else {
        setMain([]); // No meals found
        setNoMealsFound(true); // Set flag for no meals found message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };
  const [likedItems, setLikedItems] = useState(new Set()); // Use a Set to track liked card IDs

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
      <div className="searchOa">
        <div>
          <div>
            <div className="inputFlex">
              <input
                className="inputSearch"
                name=""
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search..."
              />
              <button className="searchButton" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
          {noMealsFound && (
            <p className="noMealsMessage">
              No meals found for "{input}". Please try another search.
            </p>
          )}
        </div>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
