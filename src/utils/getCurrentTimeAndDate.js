const getCurrentTimeAndDate = () => {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour12: true,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export { getCurrentTimeAndDate };
