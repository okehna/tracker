import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import EntryTable from "./components/EntryTable";
import NextPaymentIn from "./components/NextPaymentIn";
import AddEntryModal from "./components/AddEntryModal";
import CategoryManagerModal from "./components/CategoryManagerModal";
import PieChartSummary from "./components/PieChartSummary";
import { exportToPDF } from "./utils/pdfExport";
import "./index.css";

const tabs = ["BILLS", "EXPENSES", "SAVINGS"];

export default function App() {
  const [activeTab, setActiveTab] = useState("BILLS");
  const [entries, setEntries] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [categories, setCategories] = useState({
    BILLS: ["Utilities", "Internet", "Rent"],
    EXPENSES: ["Groceries", "Transport", "Dining"],
    SAVINGS: ["Emergency Fund", "Travel Fund"],
  });

  const [methods, setMethods] = useState(["GCash", "Maya", "Bank", "Cash"]);

  useEffect(() => {
    const savedEntries = localStorage.getItem("entries");
    const savedCategories = localStorage.getItem("categories");
    const savedMethods = localStorage.getItem("methods");

    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedMethods) setMethods(JSON.parse(savedMethods));
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("methods", JSON.stringify(methods));
  }, [methods]);

  const handleAddClick = () => {
    setEditData(null);
    setShowAddModal(true);
  };

  const handleSaveEntry = (entry) => {
    if (editData) {
      setEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)));
    } else {
      setEntries((prev) => [...prev, { ...entry, id: Date.now() }]);
    }
    setShowAddModal(false);
  };

  const handleEdit = (entry) => {
    setEditData(entry);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

   const filteredEntries = entries.filter((e) => {
    if (e.type !== activeTab) return false;
    const entryDate = new Date(e.date);
    return (
      entryDate.getFullYear() === currentMonth.getFullYear() &&
      entryDate.getMonth() === currentMonth.getMonth()
    );
  });


const upcomingEntries = filteredEntries
  .filter((entry) => !entry.paid)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

const nextEntry = upcomingEntries.length > 0 ? upcomingEntries[0] : null;

const today = new Date();
const daysLeft = nextEntry
  ? Math.max(0, Math.ceil((new Date(nextEntry.date) - today) / (1000 * 60 * 60 * 24)))
  : null;

const nextTitle = nextEntry?.title || "";

 const nextUnpaid = entries
    .filter(
      (e) =>
        e.type === activeTab &&
        !e.paid &&
        new Date(e.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const nextInDays = nextUnpaid
    ? Math.ceil(
        (new Date(nextUnpaid.date) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const totalPaid = filteredEntries
    .filter((e) => e.paid)
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const totalUnpaid = filteredEntries
    .filter((e) => !e.paid)
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);


  return (
    <div
      className="min-h-screen bg-[#f7f2ec] p-4 font-[Century Gothic]"
      id="export-area"
    >
      <div className="mb-4">
        <h1 className="text-3xl font-light tracking-wider text-center">
          TRACKER
        </h1>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`min-w-[120px] text-center px-4 py-2 rounded-full text-sm ${
              activeTab === tab
                ? "bg-[#7C5E42] text-white"
                : "bg-white text-[#7C5E42] border border-[#7C5E42]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

     <div className="mb-4">
        <Calendar        
          entries={filteredEntries}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      </div>
<div>
<div className="bg-white rounded-2xl shadow-md font-[Century Gothic] h-[408px] flex flex-col justify-start px-4 pt-4 mb-4">

  {/* NEXT PAYMENT IN Header */}
  <div className="bg-[#7C5E42] text-white rounded-t-2xl mb-10 px-4 py-2">
    <div className="text-lg font-light tracking-wide text-center">
      NEXT PAYMENT IN
    </div>
  </div>

{/* NEXT PAYMENT IN Message or No entries */}
<div className="bg-white p-4 text-center text-[#7C5E42] font-[Century Gothic] text-2xl mb-11">
  {daysLeft !== null ? (
    <>
      In <strong>{daysLeft}</strong> day{daysLeft !== 1 ? "s" : ""} – <strong>{nextTitle}</strong>
    </>
  ) : (
    "No upcoming unpaid entries."
  )}
</div>

{/* Page break only after this group */}
<div className="mobile-page-break"></div>
  {/* SUMMARY Header */}
  <div className="bg-[#7C5E42] text-white squared-t-2xl mb-4 px-4 py-2">
    <div className="text-lg font-light tracking-wide text-center">SUMMARY</div>
  </div>


{/* Paid and Left to Pay Totals */}
  <div className="bg-white p-6 text-[#7C5E42] font-[Century Gothic] text-sm flex flex-col gap-1 items-center">
    <div className="text-center text-base font-light">
      <strong>PAID:</strong> ₱{totalPaid.toLocaleString()}
    </div>
    <div className="text-center text-base font-light">
      <strong>LEFT TO PAY:</strong> ₱{totalUnpaid.toLocaleString()}
    </div>
  </div>
</div>


{/* PIE CHART AND TABLE */}
<div className="h-full flex items-start mt-0">
  <div className="w-full">
    <PieChartSummary entries={filteredEntries} />
  </div>
</div>

     <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold">
              Your {activeTab[0] + activeTab.slice(1).toLowerCase()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleAddClick}
                className="w-[110px] bg-[#7C5E42] text-white text-xs px-2 py-2 rounded-md text-center"
              >
              ADD{" "}
                {(
                  activeTab.slice(0, -1).charAt(0) +
                  activeTab.slice(1).toLowerCase().slice(0, -1)
                ).toUpperCase()}
              </button>
              <button
                onClick={exportToPDF}
                className="w-[110px] bg-[#7C5E42] text-white text-xs px-2 py-2 rounded-md text-center"
              >
                EXPORT PDF
              </button>
            </div>
          </div>

        <EntryTable
            entries={filteredEntries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

     {/* Modals */}
      {showAddModal && (
        <AddEntryModal
          type={activeTab}
          categories={categories[activeTab] || []}
          methods={methods}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveEntry}
          onManageCategories={(updatedList) =>
           setCategories((prev) => ({
              ...prev,
              [activeTab]: updatedList || [],
            }))
          }
          onManageMethods={(updated) => setMethods(updated || [])}
          editData={editData}
        />
      )}

       {showCategoryModal && (
        <CategoryManagerModal
          type={activeTab}
          categories={categories[activeTab] || []}
          onClose={() => setShowCategoryModal(false)}
          onSave={(updatedList) =>
            setCategories((prev) => ({
              ...prev,
              [activeTab]: updatedList || [],
            }))
          }
        />
      )}
    <div>
</div>
</div>
  )
}
