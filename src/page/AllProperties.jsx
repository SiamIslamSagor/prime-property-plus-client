import { Helmet } from "react-helmet-async";
import CardHolder from "../components/pageComponents/CardHolder/CardHolder";
import OurLocationMap from "../components/pageComponents/OurLocationMap/OurLocationMap";
import PropertyCard from "../components/pageComponents/PropertyCard/PropertyCard";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useContextData from "../hooks/useContextData";
import useVerifiedProperty from "../hooks/useVerifiedProperty";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";

const AllProperties = () => {
  // state

  // context data
  const { propertyCardDelay, scrollTop } = useContextData();

  // hooks
  const { verifiedPropertiesData: loadedData, isLoading } =
    useVerifiedProperty();

  // state
  const [asc, setAsc] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [verifiedPropertiesData, setVerifiedPropertiesData] =
    useState(loadedData);
  // effect
  useEffect(() => {
    scrollTop();
  }, [scrollTop]);

  useEffect(() => {
    if (loadedData.length > 0) {
      setVerifiedPropertiesData(loadedData);
    }
  }, [loadedData]);

  // handler

  // search function
  const handleSearch = () => {
    const searchText = typedText;
    // console.log(filteredData);
    console.log(searchText);

    // /////////////

    console.log();
    const result = loadedData?.filter(property =>
      property.propertyTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(result);
    setVerifiedPropertiesData(result);
  };

  // key press handler
  const handleKeyPress = e => {
    //  if press enter key then call search function
    // we do it this many way
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // handler sort
  const handleSort = () => {
    if (asc === true) {
      const bestDeals = verifiedPropertiesData.sort(
        (a, b) => a.propertyPriceRange[0] - b.propertyPriceRange[0]
      );
      setVerifiedPropertiesData(bestDeals);
      setAsc(false);
    } else {
      const bestDeals = verifiedPropertiesData.sort(
        (a, b) => b.propertyPriceRange[0] - a.propertyPriceRange[0]
      );
      setVerifiedPropertiesData(bestDeals);
      setAsc(true);
    }
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>P P P | All Properties</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="max-lg:my-10 lg:my-20">
        <SectionTitle heading={"all properties"}></SectionTitle>{" "}
      </div>

      <div className="flex items-center flex-col-reverse">
        <div className="text-center mt-8 mb-16 flex items-center justify-center relative w-full max-w-xs md:max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Property Title Here"
            className="input text-lg input-bordered input-md w-full max-w-xs md:max-w-md"
            value={typedText}
            onChange={e => setTypedText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className=" absolute right-5 bg-transparent"
          >
            <FiSearch className="text-3xl hover:text-[28px] duration-75"></FiSearch>
          </button>
        </div>
        <div>
          <PrimaryBtn
            handler={handleSort}
            btnText="sort by price range"
          ></PrimaryBtn>
        </div>
      </div>

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
          {verifiedPropertiesData &&
            verifiedPropertiesData?.map((property, idx) => (
              <PropertyCard
                key={property?._id}
                property={property}
                animDelay={propertyCardDelay[idx]}
              ></PropertyCard>
            ))}
        </div>
      )}
      <div>
        <OurLocationMap></OurLocationMap>
      </div>
    </div>
  );
};

export default AllProperties;
