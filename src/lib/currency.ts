export const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 155.2,
  AUD: 1.52,
  CAD: 1.37,
};

export const convertCurrency = (cents: number, from: string, to: string) => {
  const usd = cents / (exchangeRates[from] || 1);
  return Math.round(usd * (exchangeRates[to] || 1));
};

const currencyLocales: Record<string, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  AUD: "en-AU",
  CAD: "en-CA",
};

export const getLocale = (currency: string) => currencyLocales[currency] || "en-IN";

export const fmtCurrency = (cents: number, currency: string = "INR") =>
  new Intl.NumberFormat(getLocale(currency), { style: "currency", currency, maximumFractionDigits: 0 }).format(cents / 100);
