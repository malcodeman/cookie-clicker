function formatNumber(number: number): number {
  return Number(Intl.NumberFormat().format(number));
}

const EXPORTS = {
  formatNumber,
};

export default EXPORTS;
