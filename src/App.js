import { useState } from "react";

export default function App() {
  const [sallery, setSallery] = useState("");
  const [category, setCategory] = useState("food");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="app">
      <Header sallery={sallery} setSallery={setSallery} />
      <Inputs
        category={category}
        setCategory={setCategory}
        product={product}
        setProduct={setProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
      />
      <Category />
      <Total />
    </div>
  );
}

function Header({ sallery, setSallery }) {
  return (
    <div className="header">
      <h1>
        EXPENSE TRAC<span className="green">K</span>
        <span className="yellow">E</span>
        <span className="red">R</span>
      </h1>
      <div>
        <p>How much is your sallery:</p>
        <input
          type="number"
          value={sallery}
          onChange={(e) => setSallery(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

function Inputs({
  category,
  setCategory,
  product,
  setProduct,
  quantity,
  setQuantity,
  price,
  setPrice,
}) {
  return (
    <div className="inputs">
      <label>Category:</label>
      <select value={category} onChange={setCategory}>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="sport">Sport</option>
        <option value="gifts">Gifts</option>
        <option value="shopping">Shopping</option>
      </select>

      <label>Product:</label>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <label>Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <button className="button">Submit</button>
    </div>
  );
}

function Category() {
  return (
    <div>
      <ul className="categories">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ul>
    </div>
  );
}

function Item() {
  return (
    <li className="category-container">
      <h2>Food</h2>
      <div className="item">
        <div>
          <span>2</span>
          <span>Burger</span>
          <span>$20</span>
        </div>

        <div className="item-actions">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
      <p>Summary: $60</p>
    </li>
  );
}

function Total() {
  return (
    <div className="total">
      <p>TOTAL: $160</p>
      <p>Remaining sallery: $840</p>
    </div>
  );
}
