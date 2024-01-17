import React, { useEffect, useState } from "react";
// import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { userRequest } from "../requestMethods";

const stripePromise = loadStripe(
  "pk_test_51Nt2jrSE52eZpJbDpxKUketgshST2Pz7DZWRHpwbe4OoFNqSbSiowojOwNj3n1f4HaXyH4XVSnHsybzx4X6Uy3yP00J9xNFgAF"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(
            "/checkout/payment"
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;