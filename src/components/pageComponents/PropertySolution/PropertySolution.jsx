/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";

const PropertySolution = () => {
  return (
    <div className="bg-s-color py-28 my-28">
      <div className="text-white mb-20">
        <SectionTitle heading={"solutions for property owners"}></SectionTitle>
      </div>
      <div className="text-white flex max-lg:justify-center justify-between gap-5 max-lg:flex-wrap container mx-auto">
        <div className="p-10 max-lg:mb-5 text-center max-w-lg lg:max-w-sm border-8 glass group">
          <h4 className="text-3xl">Looking for Property Management?</h4>
          <p className="my-4 text-lg">Optimize Your Property's Value</p>
          <Link to="/all-properties">
            <SecondaryBtn btnText="learn more"></SecondaryBtn>
          </Link>
        </div>
        <div className="p-10 max-lg:mb-5 text-center max-w-lg lg:max-w-sm border-8 glass group">
          <h4 className="text-3xl">Interested in Property Valuation?</h4>
          <p className="my-4 text-lg">Request a Complimentary BOV</p>
          <Link to="/all-properties">
            <SecondaryBtn btnText="learn more"></SecondaryBtn>
          </Link>
        </div>
        <div className="p-10 max-lg:mb-5 text-center max-w-lg lg:max-w-sm border-8 glass group">
          <h4 className="text-3xl">Searching for Financing Solutions?</h4>
          <p className="my-4 text-lg">Secure Best-in-Market Options</p>
          <Link to="/all-properties">
            <SecondaryBtn btnText="learn more"></SecondaryBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertySolution;
