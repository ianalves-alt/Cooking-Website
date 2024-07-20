"use client";
import { useState } from "react";
import style from "@/styles/cards.module.css";

export default function Inputbox() {
  const [food, setfood] = useState("");
  const [display, setdisplay] = useState("");
  const [image, setimage] = useState("");
  function searchfood(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setdisplay(JSON.stringify(data /*.meals[0].strMeal*/));
        setimage(data.meals[0].strMealThumb);
      });
  }
  return (
    <>
      <input
        className={style.display}
        value={food}
        onChange={(e) => setfood(e.target.value)}
      />
      <button className={style.display} onClick={() => searchfood(food)}>
        search
      </button>
      <p className={style.display}>{display}</p>
      <img className={style.display} src={image} alt="" />
    </>
  );
}
