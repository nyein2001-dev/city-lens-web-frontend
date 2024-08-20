import React, { useEffect, useState } from "react";
import { getItem } from "../api";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (id) => {
    try {
      const response = await getItem(id);
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      <p>{item.description}</p>
    </div>
  );
};

export default ItemDetail;
