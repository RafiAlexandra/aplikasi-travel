import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist items={items} onRemoveItem={handleRemoveItem} />
      <Stats itemsCount={items.length} />
    </div>
  );
}

function Logo() {
  return <h1> 🔥 jALAN EUY 🔥</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Apa aja yang di bawa? 🤔</h3>
      <h3>Yuk Cheklist barang 🌾</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Barang yang mau dibawa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Bawa</button>
    </form>
  );
}

function Packinglist({ items, onRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem }) {
  function handleRemove() {
    onRemoveItem(item.id);
  }

  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleRemove}>❌</button>
    </li>
  );
}

function Stats({ itemsCount }) {
  return (
    <footer className="stats">
      <em>
        kamu punya {itemsCount} barang di daftar, dan sudah packing 0 barang (0%)
      </em>
    </footer>
  );
}
