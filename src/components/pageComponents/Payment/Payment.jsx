import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>P P P | Dashboard | Payment</title>
      </Helmet>
      <div className="mx-auto max-w-2xl lg:max-w-3xl px-4">
        <div className="my-10 lg:my-20">
          <SectionTitle heading={"payment"}></SectionTitle>
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
