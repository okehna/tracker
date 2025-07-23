export const formatAmount = (amount) => {
  const num = Number(amount || 0);
  return num.toLocaleString("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
