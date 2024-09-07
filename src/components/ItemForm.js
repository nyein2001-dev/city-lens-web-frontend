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
      className="rounded-xl bg-white mb-5 p-7 dark:bg-night-800 container mx-auto"
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 dark:text-night-50">
          Name
        </label>
        <input
          type="text"
          className="border px-4 py-2 w-full"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 dark:text-night-50">
          Description
        </label>
        <textarea
          className="border px-4 py-2 w-full"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="border-gray-100 bg-green-500 text-gray-400 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-400 dark:border-night-700 dark:text-night-400 dark:hover:border-primary-500 dark:hover:bg-primary-500/20 dark:hover:text-primary-500 inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 px-2 py-1.5 text-xs font-medium"
      >
        {isEdit ? "Update" : "Create"} Item
      </button>
    </form>
  );
};

export default ItemForm;
