import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-6 dark:bg-gray-800">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Items List
        </h1>
        <Link
          to="/items/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          Add New Item
        </Link>
      </div>
      <ul className="bg-white rounded-xl shadow-md p-4 dark:bg-gray-800">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 border-b last:border-b-0 dark:border-gray-700"
          >
            <Link
              to={`/items/${item.id}`}
              className="text-lg text-gray-800 dark:text-gray-200 hover:underline"
            >
              {item.name}
            </Link>
            <div className="space-x-2">
              <Link
                to={`/items/${item.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
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
