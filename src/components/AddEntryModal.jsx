import React, { useState, useEffect } from "react";
import CategoryManagerModal from "./CategoryManagerModal";
import MethodManagerModal from "./MethodManagerModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEntryModal({
  type,
  categories,
  methods,
  onClose,
  onSave,
  onManageCategories,
  onManageMethods,
  editData,
}) {
  const isSavings = type === "SAVINGS";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("unpaid");

  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showMethodManager, setShowMethodManager] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState(Array.isArray(categories) ? [...categories] : []);
  const [methodOptions, setMethodOptions] = useState(Array.isArray(methods) ? [...methods] : []);

  useEffect(() => {
    setCategoryOptions(Array.isArray(categories) ? [...categories] : []);
    setMethodOptions(Array.isArray(methods) ? [...methods] : []);
  }, [categories, methods]);

useEffect(() => {
  if (editData) {
    setTitle(editData.title || "");
    setCategory(editData.category || "");
    setAmount(editData.amount || "");
    setDate(editData.date || "");
    setMethod(editData.method || "");
    setNotes(editData.notes || "");
    setStatus(editData.status || "unpaid");
  } else {
    // ✨ Reset form when adding new
    setTitle("");
    setCategory("");
    setAmount("");
    setDate("");
    setMethod("");
    setNotes("");
    setStatus("unpaid");
  }
}, [editData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !amount || !date) return;

    const entry = {
  id: editData ? editData.id : Date.now(),
  title,
  category,
  amount,
  date: date instanceof Date ? date.toISOString().split("T")[0] : date,
  method,
  notes,
  type,
  status,
  paid: status === "paid", // ✅ This is the critical addition
};


    onSave(entry);
    onClose();
  };

  return (
  <>
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center font-[Century Gothic]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-light mb-4 text-center text-[#7C5E42]">
          {editData ? "Edit" : "Add New"}{" "}
          {type === "BILLS"
            ? "Bill"
            : type === "EXPENSES"
            ? "Expense"
            : "Savings"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="mb-3">
            <label className="block mb-1 text-sm font-[Century Gothic]">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#7C5E42] font-[Century Gothic]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <div className="flex gap-2">
              <select
                className="w-full border rounded px-2 py-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowCategoryManager(true)}
                className="bg-[#A88C6C] text-white text-xs px-3 rounded"
              >
                MANAGE
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              {isSavings ? "Date" : "Due Date"}
            </label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="w-full border rounded px-2 py-1 text-sm"
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              required
            />
          </div>

          {!isSavings && (
            <div>
              <label className="block mb-1">Status</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1">
              {isSavings ? "Savings Method" : "Method"}
            </label>
            <div className="flex gap-2">
              <select
                className="w-full border rounded px-2 py-1"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                {methodOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-[#A88C6C] text-white text-xs px-3 rounded"
                onClick={() => setShowMethodManager(true)}
              >
                MANAGE
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1">Notes</label>
            <textarea
              className="w-full border rounded px-2 py-1 text-sm resize-y min-h-[80px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#7C5E42] text-white px-4 py-1 rounded"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-[#7C5E42] text-white px-4 py-1 rounded"
            >
              {editData ? "Save Changes" : "DONE"}
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Modals outside the main modal */}
    {showCategoryManager && (
      <CategoryManagerModal
        type={type}
        categories={categoryOptions}
        onSave={(updatedCategories) => {
          const newList = [...updatedCategories];
          setCategoryOptions(newList);
          if (!newList.includes(category)) {
            setCategory(newList[0] || "");
          }
          if (typeof onManageCategories === "function") {
            onManageCategories(newList);
          }
          setShowCategoryManager(false);
        }}
        onClose={() => setShowCategoryManager(false)}
      />
    )}

    {showMethodManager && (
      <MethodManagerModal
        methods={methodOptions}
        onSave={(updatedMethods) => {
          setMethodOptions(updatedMethods);
          if (!updatedMethods.includes(method)) {
            setMethod(updatedMethods[0] || "");
          }
          if (typeof onManageMethods === "function") {
            onManageMethods(updatedMethods);
          }
          setShowMethodManager(false);
        }}
        onClose={() => setShowMethodManager(false)}
      />
    )}
  </>
);
}
