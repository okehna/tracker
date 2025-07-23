// src/components/NextPaymentIn.jsx
import React from "react";

export default function NextPaymentIn({ daysLeft, nextTitle }) {
  return (
    <div className="bg-white rounded-2xl shadow-md font-[Century Gothic] h-[408px] flex flex-col justify-between px-4 pt-4">
  <div className="bg-[#7C5E42] text-white rounded-t-2xl mb-2 px-4 py-2">
    <div className="text-lg font-light tracking-wide text-center">NEXT PAYMENT IN</div>
  </div>

  <div className="bg-white p-4 text-center text-[#7C5E42] font-[Century Gothic] text-2xl">
  {daysLeft !== null ? (
    <>
      In <strong>{daysLeft}</strong> day{daysLeft !== 1 ? "s" : ""} – <strong>{nextTitle}</strong>
    </>
  ) : (
    "No upcoming unpaid entries."
  )}
</div>
</div>
   
  );
}
