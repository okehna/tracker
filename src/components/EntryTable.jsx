// components/EntryTable.jsx
import React from "react";
import { formatCurrency } from "../utils/formatCurrency";

export default function EntryTable({ entries, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden font-[Century Gothic] uppercase font-thin p-4">
      {/* SCROLLABLE AREA */}
      <div className="overflow-x-auto w-full">
        {/* Colored header */}
        <div className="bg-[#7C5E42] rounded-t-2xl text-xs font-semibold text-white border-b min-w-[600px] px-6 py-3">
          <div className="grid grid-cols-7 gap-4">
            <div>DESCRIPTION</div>
            <div>CATEGORY</div>
            <div>AMOUNT</div>
            <div>DATE</div>
            <div>METHOD</div>
            <div>STATUS</div>
            <div>ACTIONS</div>
          </div>
        </div>

        {/* Entries */}
        <div className="text-sm px-6 py-4 min-w-[600px]">
          {entries.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No entries for this month
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-7 gap-4 py-3 items-center border-t text-xs"
              >
                <div>{entry.title}</div>
                <div>{entry.category}</div>
                <div>{formatCurrency(entry.amount)}</div>
                <div>
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })}
                </div>
                <div>{entry.method}</div>
<div>
  {entry.paid ? (
    <span className="text-[#C7A17A] font-semibold">Paid</span>
  ) : (
    <span className="text-[#7C5E42] font-semibold">Unpaid</span>
  )}
</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(entry)}
                    className="text-xs bg-[#A88C6C] text-white px-2 py-1 rounded"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-xs bg-[#7C5E42] text-white px-2 py-1 rounded"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
