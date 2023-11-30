import { Toaster } from "react-hot-toast";
import useContextData from "../../../hooks/useContextData";
import usePropertyBought from "../../../hooks/usePropertyBought";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import CardHolder from "../CardHolder/CardHolder";
import MyWishListCard from "../MyWishList/MyWishListCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PropertyBought = () => {
  // hooks
  const { boughtPropertyData, isLoading } = usePropertyBought();
  const { propertyCardDelay } = useContextData();
  console.log(isLoading);
  console.log(boughtPropertyData);

  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Property Bought</title>
      </Helmet>
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
        {boughtPropertyData.length === 0 && (
          <div className="mt-40 text-center">
            <p className="text-2xl">You do not give offer for any property</p>{" "}
            <br />
            <p className="text-xl">
              go to{" "}
              <Link
                className="text-blue-700  font-medium hover:link"
                to="/dashboard/wish-list"
              >
                <small>Wish List</small>
              </Link>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyBought;
