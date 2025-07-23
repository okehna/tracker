import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#7C5E42", "#C7A17A", "#A88C6C"];

const formatCurrency = (amount) =>
  `₱${Number(amount || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function PieChartSummary({ entries }) {
  let billTotal = 0;
  let expenseTotal = 0;
  let savingsTotal = 0;

  entries.forEach((entry) => {
    const amount = Number(entry.amount || 0);
    if (entry.type === "BILLS") {
      billTotal += amount;
    } else if (entry.type === "EXPENSES") {
      expenseTotal += amount;
    } else if (entry.type === "SAVINGS") {
      savingsTotal += amount;
    }
  });

  const data = [
    { name: "Bills", value: billTotal },
    { name: "Expenses", value: expenseTotal },
    { name: "Savings", value: savingsTotal },
  ];

return (
  <div className="bg-white rounded-2xl shadow-md font-[Century Gothic] h-[408px] flex flex-col justify-between px-4 pt-4">
    <div className="bg-[#7C5E42] text-white rounded-t-2xl mb-2 px-4 py-2">
      <div className="text-lg font-light tracking-wide text-center">OVERVIEW</div>
    </div>

      <div className="flex flex-col items-center gap-16">
        <div className="mt-[-6px]">
          <PieChart width={170} height={170}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
         labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </div>

        <div className="mt-1 space-y-1 text-center font-[Century Gothic] text-sm">
        <div className="relative -top-7 text-center font-[Century Gothic] text-sm space-y-[2px]">
  <div className="text-[#7C5E42] font-light">
    BILLS: {formatCurrency(billTotal)}
  </div>
  <div className="text-[#C7A17A] font-light">
    EXPENSES: {formatCurrency(expenseTotal)}
  </div>
  <div className="text-[#A88C6C] font-light">
    SAVINGS: {formatCurrency(savingsTotal)}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}
