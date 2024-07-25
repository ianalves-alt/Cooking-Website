import "@/styles/categories.css";
import Link from "next/link";
export default function Categories() {
  return (
    <>
      <div>
        <div>
          <h1 className="categoriesTitle">Categories</h1>
        </div>
        <div>
          <p className="categorySubtitle">
            The Category section is where you can dive into the world of
            specific types of dishes, each with its own unique flair and appeal.
            One beloved category is seafood, encompassing a variety of recipes
            that highlight the bounty of the ocean. From succulent shrimp scampi
            and savory clam chowder to exquisite sushi and grilled salmon,
            seafood dishes offer an array of textures and flavors that can be
            both delicate and bold. Rich in nutrients and versatile in
            preparation, seafood can be grilled, steamed, baked, or fried,
            making it a favorite for health-conscious individuals and gourmet
            enthusiasts alike. Whether you're looking for a light and refreshing
            ceviche or a hearty seafood paella, this category promises to bring
            the taste of the sea to your table.
          </p>
        </div>
        <div>
          <div>
            <h1 className="filterByArea">Filter by area</h1>
          </div>
          <ul className="Areas">
            <li>
              <Link href="/area/American">American</Link>
            </li>
            <li>
              <Link href="/area/British">British</Link>
            </li>
            <li>
              <Link href="/area/Canadian">Canadian</Link>
            </li>
            <li>
              <Link href="/area/Chinese">Chinese</Link>
            </li>
            <li>
              <Link href="/area/Croatian">Croatian</Link>
            </li>
            <li>
              <Link href="/area/Dutch">Dutch</Link>
            </li>
            <li>
              <Link href="/area/Egyptian">Egyptian</Link>
            </li>
            <li>
              <Link href="/area/Filipino">Filipino</Link>
            </li>
            <li>
              <Link href="/area/French">French</Link>
            </li>
            <li>
              <Link href="/area/Greek">Greek</Link>
            </li>
            <li>
              <Link href="/area/Indian">Indian</Link>
            </li>
            <li>
              <Link href="/area/Irish">Irish</Link>
            </li>
            <li>
              <Link href="/area/Italian">Italian</Link>
            </li>
            <li>
              <Link href="/area/Jamaican">Jamaican</Link>
            </li>
            <li>
              <Link href="/area/Japanese">Japanese</Link>
            </li>
            <li>
              <Link href="/area/Kenyan">Kenyan</Link>
            </li>
            <li>
              <Link href="/area/Malaysian">Malaysian</Link>
            </li>
            <li>
              <Link href="/area/Mexican">Mexican</Link>
            </li>
            <li>
              <Link href="/area/Moroccan">Moroccan</Link>
            </li>
            <li>
              <Link href="/area/Polish">Polish</Link>
            </li>
            <li>
              <Link href="/area/Portuguese">Portuguese</Link>
            </li>
            <li>
              <Link href="/area/Russian">Russian</Link>
            </li>
            <li>
              <Link href="/area/Spanish">Spanish</Link>
            </li>
            <li>
              <Link href="/area/Thai">Thai</Link>
            </li>
            <li>
              <Link href="/area/Tunisian">Tunisian</Link>
            </li>
            <li>
              <Link href="/area/Turkish">Turkish</Link>
            </li>
            <li>
              <Link href="/area/Ukrainian">Ukrainian</Link>
            </li>
            <li>
              <Link href="/area/Unknown">Unknown</Link>
            </li>
            <li>
              <Link href="/area/Vietnamese">Vietnamese</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="filterByArea">Filter by Category</h1>
        <ul className="Areas">
          <li>
            <Link href="/category/Beef">Beef</Link>
          </li>
          <li>
            <Link href="/category/Breakfast">Breakfast</Link>
          </li>
          <li>
            <Link href="/category/Chicken">Chicken</Link>
          </li>
          <li>
            <Link href="/category/Dessert">Dessert</Link>
          </li>
          <li>
            <Link href="/category/Goat">Goat</Link>
          </li>
          <li>
            <Link href="/category/Lamb">Lamb</Link>
          </li>
          <li>
            <Link href="/category/Miscellaneous">Miscellaneous</Link>
          </li>
          <li>
            <Link href="/category/Pasta">Pasta</Link>
          </li>
          <li>
            <Link href="/category/Pork">Pork</Link>
          </li>
          <li>
            <Link href="/category/Seafood">Seafood</Link>
          </li>
          <li>
            <Link href="/category/Side">Side</Link>
          </li>
          <li>
            <Link href="/category/Starter">Starter</Link>
          </li>
          <li>
            <Link href="/category/Vegan">Vegan</Link>
          </li>
          <li>
            <Link href="/category/Vegetarian">Vegetarian</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
