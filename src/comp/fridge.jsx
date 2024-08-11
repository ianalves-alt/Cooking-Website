"use client";
import "@/styles/fridge.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import DisplayFridgeItems from "./displayFridgeItems";
import GenerateRecepies from "./generateRecepie";
export default function FridgeComponent() {
  const [allingredients, setAllIngredients] = useState([]);
  const [filteredingredients, setFilteredIngredients] = useState([]);
  const [fridge, setFridge] = useState(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("FridgeItems");
      if (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      );
      const res = await req.json();
      const data = res.meals;
      setAllIngredients(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allingredients.length > 0 && fridge.length > 0) {
      const filtered = allingredients.filter((ingredient) =>
        fridge.includes(ingredient.idIngredient),
      );
      setFilteredIngredients(filtered);
    }
  }, [allingredients, fridge]);

  const [condition, setCondition] = useState(true);
  return (
    <>
      <div className="fridgeOa">
        <div>
          <div className="fridgeTitle">Welcome to your fridge</div>
          <div>
            {condition ? (
              <p className="fridgeHas">
                Fridge has {filteredingredients.length} ingredients
              </p>
            ) : (
              <div>
                <p className="fridgeEmpty">
                  Please add something to your fridge{" "}
                </p>
              </div>
            )}
            <div>
              <DisplayFridgeItems
                setFilteredItems={setFilteredIngredients}
                filteredItems={filteredingredients}
                length={fridge.length}
                setCondition={setCondition}
              />
            </div>
          </div>
        </div>
        <GenerateRecepies filteredingredients={filteredingredients} />
      </div>
    </>
  );
}
