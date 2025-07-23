import React, { useState, useEffect } from "react";

export default function MethodManagerModal({ methods, onSave, onClose }) {
  const [newMethod, setNewMethod] = useState("");
  const [methodList, setMethodList] = useState([]);

  useEffect(() => {
    setMethodList([...methods]);
  }, [methods]);

  const handleAdd = () => {
    const trimmed = newMethod.trim();
    if (trimmed && !methodList.includes(trimmed)) {
      setMethodList((prev) => [...prev, trimmed]);
      setNewMethod("");
    }
  };

  const handleDelete = (method) => {
    setMethodList((prev) => prev.filter((m) => m !== method));
  };

  const handleSaveAndClose = () => {
    if (typeof onSave === "function") onSave(methodList);
    if (typeof onClose === "function") onClose();
  };

  const handleCancel = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm font-[Century Gothic]">
        <h2 className="text-lg font-light mb-4 text-center text-[#7C5E42]">
          Manage Methods
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="NEW METHOD"
            className="w-full border px-2 py-1 rounded"
            value={newMethod}
            onChange={(e) => setNewMethod(e.target.value)}
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
          {methodList.map((method) => (
            <li
              key={method}
              className="flex justify-between items-center mb-1 border-b pb-1"
            >
              <span>{method}</span>
              <button
                type="button"
                onClick={() => handleDelete(method)}
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
