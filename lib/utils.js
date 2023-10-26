export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "TWD",
    style: "currency",
    maximumFractionDigits: 0,
  });

  let formattedAmount = formatter.format(amount);
  formattedAmount = formattedAmount.replace("NT", "NT ");

  return formattedAmount;
};
