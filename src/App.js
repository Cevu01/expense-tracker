import { useState } from "react";
const initialExpenses = {
  food: [],
  transport: [],
  sport: [],
  gifts: [],
  shopping: [],
};
export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [sallery, setSallery] = useState("");
  const [category, setCategory] = useState("food");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleAddNewExpense(expense) {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [expense.category]: [...prevExpenses[expense.category], expense],
    }));
    // Clear the inputs after submission
    setProduct("");
    setQuantity("");
    setPrice("");
  }

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
        onAddNewExpense={handleAddNewExpense}
      />
      <Category expenses={expenses} />
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
  onAddNewExpense,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newExpense = {
      id,
      category,
      product,
      quantity,
      price,
    };
    onAddNewExpense(newExpense);
  }
  return (
    <form className="inputs" onSubmit={handleSubmit}>
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
    </form>
  );
}

function Category({ expenses }) {
  return (
    <div>
      {Object.keys(expenses).map((cat) => (
        <div key={cat}>
          <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
          <ul className="categories">
            {expenses[cat].map((expense) => (
              <Item expense={expense} key={expense.id} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Item({ expense }) {
  return (
    <li className="category-container">
      <div className="item">
        <div>
          <span>{expense.quantity}</span>
          <span>{expense.product}</span>
          <span>${expense.price}</span>
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
