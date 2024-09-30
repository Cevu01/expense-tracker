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

  function handleDelete(id, category) {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: prevExpenses[category]?.filter(
        (expense) => expense.id !== id
      ),
    }));
  }

  const totalSummary = Object.keys(expenses)?.reduce((total, key) => {
    const categoryExpenses = expenses[key];
    const categoryTotal = categoryExpenses?.reduce((catTotal, expense) => {
      return catTotal + Number(expense.price); // Ensure the price is a number
    }, 0);
    return total + categoryTotal;
  }, 0);

  const remainingSallery = sallery ? sallery - totalSummary : 0;

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
      <Category expenses={expenses} onDelete={handleDelete} />
      <Total totalSummary={totalSummary} remainingSallery={remainingSallery} />
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

function Category({ expenses, onDelete }) {
  return (
    <div>
      {Object.keys(expenses).map((cat) => (
        <div className="div" key={cat}>
          <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
          <ul className="categories">
            {expenses[cat]?.map((expense) => (
              <Item expense={expense} key={expense.id} onDelete={onDelete} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Item({ expense, onDelete }) {
  return (
    <li className="category-container">
      <div className="item">
        <div>
          <span>{expense.quantity}</span>
          <span>{expense.product}</span>
          <span>${expense.price}</span>
        </div>

        <div className="item-actions">
          <button
            className="delete"
            onClick={() => onDelete(expense.id, expense.category)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

function Total({ totalSummary, remainingSallery }) {
  return (
    <div className="total">
      <p>TOTAL: ${totalSummary}</p>
      <p>Remaining sallery: ${remainingSallery}</p>
    </div>
  );
}
