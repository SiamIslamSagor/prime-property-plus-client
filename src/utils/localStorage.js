//////////////////////
const setBoughtPropertyIdInLs = id => {
  localStorage.setItem("bought-property-id", id);
};

const getBoughtPropertyIdInLs = () => {
  const result = localStorage.getItem("bought-property-id");
  return result;
};
//////////////////////

export { setBoughtPropertyIdInLs, getBoughtPropertyIdInLs };
