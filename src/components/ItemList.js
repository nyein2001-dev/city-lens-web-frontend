import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../api";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();  // Refresh items list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id} className="border-b py-2 flex justify-between">
            {item.name}
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 mr-2"
                onClick={() => window.location.href = `/items/${item.id}/edit`}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
