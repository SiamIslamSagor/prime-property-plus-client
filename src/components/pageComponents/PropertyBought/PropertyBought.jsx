import { Toaster } from "react-hot-toast";
import useContextData from "../../../hooks/useContextData";
import usePropertyBought from "../../../hooks/usePropertyBought";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import CardHolder from "../CardHolder/CardHolder";
import MyWishListCard from "../MyWishList/MyWishListCard";

const PropertyBought = () => {
  // hooks
  const { boughtPropertyData, isLoading } = usePropertyBought();
  const { propertyCardDelay } = useContextData();
  console.log(isLoading);
  console.log(boughtPropertyData);

  return (
    <div>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"PROPERTY BOUGHT"}></SectionTitle>
      </div>
      <div>
        {" "}
        {isLoading ? (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
          </div>
        ) : (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {boughtPropertyData &&
              boughtPropertyData?.map((property, idx) => (
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

export default PropertyBought;
