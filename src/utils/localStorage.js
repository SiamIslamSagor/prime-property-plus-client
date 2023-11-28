//////////////////////
const setOfferedAmountInLs = amount => {
  localStorage.setItem("offered-amount", amount);
};

const getOfferedAmountInLs = () => {
  const result = localStorage.getItem("offered-amount");
  return JSON.parse(result);
};
//////////////////////

export { setOfferedAmountInLs, getOfferedAmountInLs };
