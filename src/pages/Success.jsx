import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  
  const cart = useSelector(state=>state.cart)
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const { search } = useLocation();
  
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const createOrder = async () => {
      console.log("under create order")
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: payment_intent.address,
        });
        setOrderId(res.payment_intent.id);
      } catch(err){console.log(err)}
    };
    payment_intent && createOrder();
  }, [cart, payment_intent, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        <Link to = "/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
     n </Link>
    
    </div>
  );
};

export default Success;