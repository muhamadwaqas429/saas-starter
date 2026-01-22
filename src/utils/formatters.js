// src/utils/formatters.js

// Format number as currency
export function formatCurrency(amount, currency = "$") {
  if (isNaN(amount)) return amount;
  return currency + Number(amount).toLocaleString();
}

// Format date to readable format
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Format numbers with commas
export function formatNumber(value) {
  if (isNaN(value)) return value;
  return Number(value).toLocaleString();
}

// Format percentage
export function formatPercentage(value) {
  if (isNaN(value)) return value;
  return `${Number(value).toFixed(2)}%`;
}
