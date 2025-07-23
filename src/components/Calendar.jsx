import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar({ entries, currentMonth, onMonthChange }) {

const currentDate = dayjs(currentMonth);

  const today = dayjs();

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

 const calendarDays = [];

const prevMonth = currentDate.subtract(1, "month");
const nextMonth = currentDate.add(1, "month");
const daysInPrevMonth = prevMonth.daysInMonth();

// Fill in last days of previous month
for (let i = startDay - 1; i >= 0; i--) {
  calendarDays.push({
    date: prevMonth.date(daysInPrevMonth - i),
    isCurrentMonth: false,
  });
}

// Fill current month
for (let d = 1; d <= daysInMonth; d++) {
  calendarDays.push({
    date: currentDate.date(d),
    isCurrentMonth: true,
  });
}

// Fill in next month's starting days to make 42 total cells
while (calendarDays.length < 42) {
  calendarDays.push({
    date: nextMonth.date(calendarDays.length - (startDay + daysInMonth) + 1),
    isCurrentMonth: false,
  });
}


 const handlePrevMonth = () => {
  const newDate = dayjs(currentMonth).subtract(1, "month").toDate();
  onMonthChange(newDate);
};

const handleNextMonth = () => {
  const newDate = dayjs(currentMonth).add(1, "month").toDate();
  onMonthChange(newDate);
};

 const getEntriesByDate = (date) => {
  return entries.filter((entry) => {
    const entryDate = dayjs(entry.date, ["MM-DD-YYYY", "M-D-YYYY", "YYYY-MM-DD"]);
    return entryDate.isSame(date, "day") && entryDate.month() === currentDate.month();
  });
};


  return (
    <div className="bg-white rounded-2xl shadow-md p-4 font-[Century Gothic]">
      <div className="flex justify-between items-center px-4 py-2 bg-[#7C5E42] text-white rounded-t-2xl border-b border-[#7C5E42] mb-2">
        <button onClick={handlePrevMonth}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-lg font-light tracking-wide mx-auto font-[Century Gothic]">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-light text-[#7C5E42]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-center mt-1 text-sm h-[300px]">
  {calendarDays.map(({ date, isCurrentMonth }, idx) => {
  const entriesForDate = getEntriesByDate(date);
  const isToday = date.isSame(today, "day");
  const hasEntry = isCurrentMonth && entriesForDate.length > 0;

  return (
    <div key={idx} className="py-2 flex items-center justify-center">
      <div
       className={`flex items-center justify-center rounded-full ${
    isToday ? "border border-[#7C5E42]" : ""
  } ${
    hasEntry
      ? "text-[#7C5E42] font-bold text-2xl w-12 h-12"
      : isCurrentMonth
      ? "text-black w-8 h-8 text-base"
      : "text-gray-400 w-8 h-8 text-base"
  }`}
>
        {date.date()}
      </div>
    </div>
  );
})}

</div>
    </div>
  );
}
