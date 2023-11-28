import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getOfferedAmountInLs } from "../../../utils/localStorage";
import useContextData from "../../../hooks/useContextData";

const CheckOutForm = () => {
  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // get offered amount in ls
  const offeredAmount = getOfferedAmountInLs();
  console.log(offeredAmount);

  //   hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  //   state
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  //   effect
  useEffect(() => {
    if (offeredAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: offeredAmount })
        .then(res => {
          console.log(res.data);
          setClientSecret(res?.data?.clientSecret);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [axiosSecure, offeredAmount]);

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
      //   toast.success("payment successfully.", { id: toastId });
    }

    // confirm payment
    const { paymentIntent, error: paymentErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });

    if (paymentErr) {
      console.log("payment Err", paymentErr);
      toast.error(`Failed to payment. ${error?.message}`, {
        id: toastId,
      });
    } else {
      console.log("payment Int", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction Id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        toast.success(
          `payment successfully. transactionId: ${paymentIntent.id}`,
          { id: toastId }
        );
      }
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
      <div className="my-10">
        <PrimaryBtn
          btnType="submit"
          btnText="pay"
          isDisable={!stripe || !clientSecret}
          isLoadingBtn={isLoadingBtn}
        ></PrimaryBtn>
        <div className="mt-5">
          {transactionId && (
            <p className="font-medium text-green-600">
              transaction id: {transactionId}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
