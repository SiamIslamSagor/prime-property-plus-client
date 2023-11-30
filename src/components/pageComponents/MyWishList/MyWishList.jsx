import { Toaster } from "react-hot-toast";
import useContextData from "../../../hooks/useContextData";
import useWishList from "../../../hooks/useWishList";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import CardHolder from "../CardHolder/CardHolder";
import MyWishListCard from "./MyWishListCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyWishList = () => {
  // hooks
  const { wishListData, isLoading } = useWishList();
  console.log(wishListData);
  const { propertyCardDelay } = useContextData();

  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | My WishList</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="p-10">
        <SectionTitle heading={"my wish list"}></SectionTitle>
      </div>
      <div>
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
        {wishListData.length === 0 && (
          <div className="mt-40 text-center">
            <p className="text-2xl">
              You do not have added any property in your wis list
            </p>{" "}
            <br />
            <p className="text-xl">
              go to{" "}
              <Link
                className="text-blue-700  font-medium hover:link"
                to="/all-properties"
              >
                <small>All properties</small>
              </Link>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishList;
