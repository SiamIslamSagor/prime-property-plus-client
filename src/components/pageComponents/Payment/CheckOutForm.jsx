import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getBoughtPropertyIdInLs } from "../../../utils/localStorage";
import useContextData from "../../../hooks/useContextData";
import { useNavigate } from "react-router-dom";
import { getCurrentTimeAndDate } from "../../../utils/getCurrentTimeAndDate";

const CheckOutForm = () => {
  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // get offered amount in ls
  const boughtPropertyIdInLs = getBoughtPropertyIdInLs();

  //   hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();
  const navigate = useNavigate();

  //   state
  const [boughtPropertyInfo, setBoughtPropertyInfo] = useState({});
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  //   effect
  useEffect(() => {
    if (boughtPropertyInfo?.offeredAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: boughtPropertyInfo?.offeredAmount,
        })
        .then(res => {
          console.log(res.data);
          setClientSecret(res?.data?.clientSecret);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [axiosSecure, boughtPropertyInfo?.offeredAmount]);

  useEffect(() => {
    if (boughtPropertyIdInLs) {
      axiosSecure
        .get(`/bought-property/${boughtPropertyIdInLs}`)
        .then(res => {
          console.log(res.data);
          setBoughtPropertyInfo(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      navigate("/dashboard/property-bought");
    }
  }, [axiosSecure, boughtPropertyIdInLs, navigate]);

  //   handler
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

        ////////////////////////////
        const paymentInfo = {
          transactionId: paymentIntent.id,
          paymentDate: getCurrentTimeAndDate(),
          propertyVerificationStatus: "bought",
        };
        console.log(paymentInfo);
        // then =>
        axiosSecure
          .patch(`/property/bought/${boughtPropertyInfo?._id}`, paymentInfo)
          .then(res => {
            console.log(res.data);
            navigate("/dashboard/property-bought");
          })
          .catch(err => {
            console.log(err);
          });
        ////////////////////////////
        toast.success(
          `payment successfully. transactionId: ${paymentIntent.id}`,
          { id: toastId }
        );
        ////////////////////////////
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
