import "@/styles/categories.css";
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
            <li>American</li>
            <li>British</li>
            <li>Canadian</li>
            <li>Chinese</li>
            <li>Croatian</li>
            <li>Dutch</li>
            <li>Egyptian</li>
            <li>Filipino</li>
            <li>French</li>
            <li>Greek</li>
            <li>Indian</li>
            <li>Irish</li>
            <li>Italian</li>
            <li>Jamaican</li>
            <li>Japanese</li>
            <li>Kenyan</li>
            <li>Malaysian</li>
            <li>Mexican</li>
            <li>Moroccan</li>
            <li>Polish</li>
            <li>Portuguese</li>
            <li>Russian</li>
            <li>Spanish</li>
            <li>Thai</li>
            <li>Tunisian</li>
            <li>Turkish</li>
            <li>Ukrainian</li>
            <li>Unknown</li>
            <li>Vietnamese</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="filterByArea">Filter by Category</h1>
        <ul className="Areas">
          <li>Beef</li>
          <li>Breakfast</li>
          <li>Chicken</li>
          <li>Dessert</li>
          <li>Goat</li>
          <li>Lamb</li>
          <li>Miscellaneous</li>
          <li>Pasta</li>
          <li>Pork</li>
          <li>Seafood</li>
          <li>Side</li>
          <li>Starter</li>
          <li>Vegan</li>
          <li>Vegetarian</li>
        </ul>
      </div>
    </>
  );
}
