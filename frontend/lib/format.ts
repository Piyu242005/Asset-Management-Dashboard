export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    value || 0
  );

export const formatStatus = (status: string) =>
  status ? status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

