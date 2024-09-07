import React, { useState, useEffect } from "react";
import { createItem, updateItem, getItem } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const ItemForm = ({ isEdit }) => {
  const [item, setItem] = useState({ name: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      fetchItem(id);
    }
  }, [id, isEdit]);

  const fetchItem = async (id) => {
    try {
      const response = await getItem(id);
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateItem(id, item);
      } else {
        await createItem(item);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white shadow-md p-6 mx-auto dark:bg-gray-800"
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500"
      >
        {isEdit ? "Update" : "Create"} Item
      </button>
    </form>
  );
};

export default ItemForm;
