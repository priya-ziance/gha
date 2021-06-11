import numeral from 'numeral';

export const formatCurrency = (currency_in_cents = 0) => {
  return numeral(currency_in_cents / 100).format('$0,0.00')
};