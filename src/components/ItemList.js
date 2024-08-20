import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
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
      fetchItems(); // Refresh items list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Items List</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => (window.location.href = "/items/new")}
        >
          Add New Item
        </button>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0"
          >
            <Link to={`/items/${item.id}`} className="text-lg">
              {item.name}
            </Link>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() =>
                  (window.location.href = `/items/${item.id}/edit`)
                }
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
