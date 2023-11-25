const CardHolder = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 w-96  ease-in-out hover:-translate-y-2 duration-[350ms] h-[520px] ">
        <div className="skeleton rounded-none rounded-tr-3xl rounded-bl-3xl  h-64 w-full"></div>
        <div className="flex items-center justify-between gap-4">
          <div className="skeleton h-8 w-60"></div>
          <div className="skeleton h-6 w-16"></div>
        </div>
        <div className="skeleton h-4 w-[310px]"></div>
        <div className="skeleton h-4 w-[290px]"></div>
        <div className="skeleton h-4 w-[330px]"></div>
        <div className="flex items-center gap-4">
          <div className="skeleton  h-14 rounded-full w-14"></div>
          <div className="skeleton h-8 w-60"></div>
        </div>
        <div className="flex justify-end">
          <div className="skeleton rounded-none h-10 w-24"></div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CardHolder;
