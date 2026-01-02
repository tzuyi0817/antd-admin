export function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
