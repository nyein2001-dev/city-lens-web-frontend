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
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          className="border px-4 py-2 w-full"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          className="border px-4 py-2 w-full"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2"
      >
        {isEdit ? "Update" : "Create"} Item
      </button>
    </form>
  );
};

export default ItemForm;
