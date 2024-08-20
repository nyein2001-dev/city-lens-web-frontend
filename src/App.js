import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import ItemDetail from "./components/ItemDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/items/new" element={<ItemForm isEdit={false} />} />
          <Route path="/items/:id/edit" element={<ItemForm isEdit={true} />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
