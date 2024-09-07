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
    <div className="container mx-auto">
      <div className="rounded-xl bg-white mb-5 p-7 dark:bg-night-800 flex justify-between items-center">
        <h1 className="mb-4 text-lg font-semibold dark:text-night-50 ">
          Items List
        </h1>
        <button
          className="bg-primary-500/20 text-primary-500 border-gray-10 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-400 dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500 inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 px-2 py-1.5 text-xs font-medium"
          onClick={() => (window.location.href = "/items/new")}
        >
          Add New Item
        </button>
      </div>
      <ul className="space-y-4 rounded-xl bg-white mb-5 p-7 dark:bg-night-800">
        {items.map((item) => (
          <li
            key={item.id}
            className="pb-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0"
          >
            <Link
              to={`/items/${item.id}`}
              className="text-lg text-gray-600 dark:text-night-200"
            >
              {item.name}
            </Link>
            <div className="flex space-x-2">
              <button
                className="border-gray-100 text-gray-400 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-400 dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500 inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 px-2 py-1.5 text-xs font-medium bg-blue-500"
                onClick={() =>
                  (window.location.href = `/items/${item.id}/edit`)
                }
              >
                Edit
              </button>
              <button
                className="border-gray-100 bg-red-500 text-gray-400 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-400 dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500 inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 px-2 py-1.5 text-xs font-medium"
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
