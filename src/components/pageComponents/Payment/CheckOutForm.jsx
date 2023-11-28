import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CheckOutForm = () => {
  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  //   state
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  // handler

  const handleSubmit = async e => {
    e.preventDefault();
    const toastId = toast.loading("processing...");

    setIsLoadingBtn(true);

    // if stripe or elements not found, then return
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    // if card not found, then return
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // check if error, then return a toast
    if (error) {
      console.log("payment error", error);
      toast.error(`Failed to payment. ${error?.message}`, { id: toastId });
    }
    // if payment successfully, then console
    else {
      console.log("payment method", paymentMethod);
      toast.success("payment successfully.", { id: toastId });
    }

    // /////////
    setIsLoadingBtn(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster></Toaster>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <button type="submit" disabled={!stripe}>
        Pay
      </button> */}
      <div className="my-10">
        <PrimaryBtn
          btnType="submit"
          btnText="pay"
          isDisable={!stripe}
          isLoadingBtn={isLoadingBtn}
        ></PrimaryBtn>
      </div>
    </form>
  );
};

export default CheckOutForm;
