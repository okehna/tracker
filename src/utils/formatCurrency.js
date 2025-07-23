export function formatCurrency(amount) {
  if (isNaN(amount)) return "₱0.00";
  return `₱${parseFloat(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
