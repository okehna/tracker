import React, { useState, useEffect } from "react";

export default function CategoryManagerModal({ type, categories, onSave, onClose }) {
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setCategoryList([...categories]);
  }, [categories]);

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    const exists = categoryList.some(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase()
    );
    if (trimmed && !exists) {
      setCategoryList((prev) => [...prev, trimmed]);
      setNewCategory("");
    }
  };

  const handleDelete = (cat) => {
    setCategoryList((prev) => prev.filter((c) => c !== cat));
  };

  const handleSaveAndClose = () => {
    if (typeof onSave === "function") {
      // Pass the updated array directly
      onSave(categoryList);
    }

    if (typeof onClose === "function") onClose();
  };

  const handleCancel = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm font-[Century Gothic]">
        <h2 className="text-lg font-light mb-4 text-center text-[#7C5E42]">
          Manage {type === "SAVINGS" ? "Savings" : type === "EXPENSES" ? "Expenses" : "Bills"} Categories
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="NEW CATEGORY"
            className="w-full border px-2 py-1 rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <button
            type="button"
            className="bg-[#986F50] text-white text-xs px-3 rounded"
            onClick={handleAdd}
          >
            ADD
          </button>
        </div>

        <ul className="text-sm max-h-40 overflow-y-auto mb-4">
          {categoryList.map((cat) => (
            <li
              key={cat}
              className="flex justify-between items-center mb-1 border-b pb-1"
            >
              <span>{cat}</span>
              <button
                type="button"
                onClick={() => handleDelete(cat)}
                className="text-[#7C5E42] text-xs"
              >
                REMOVE
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[#986F50] text-white px-4 py-1 rounded"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleSaveAndClose}
            className="bg-[#7C5E42] text-white px-4 py-1 rounded"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
