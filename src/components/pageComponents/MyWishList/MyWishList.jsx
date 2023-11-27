import useContextData from "../../../hooks/useContextData";
import useWishList from "../../../hooks/useWishList";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import CardHolder from "../CardHolder/CardHolder";
import MyWishListCard from "./MyWishListCard";

const MyWishList = () => {
  // hooks
  const { wishListData, isLoading } = useWishList();
  console.log(wishListData);
  const { propertyCardDelay } = useContextData();

  return (
    <div>
      <div className="p-10">
        <SectionTitle heading={"my wish list"}></SectionTitle>
      </div>
      <div>
        {isLoading ? (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
          </div>
        ) : (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {wishListData &&
              wishListData?.map((property, idx) => (
                <MyWishListCard
                  key={property?._id}
                  property={property}
                  animDelay={propertyCardDelay[idx]}
                ></MyWishListCard>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishList;
