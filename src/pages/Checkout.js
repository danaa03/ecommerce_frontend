import { useState, useEffect } from "react";
import Header from "../components/Header";
import { checkout } from "../api/order.apis";
import { useUser } from "../context/user.context";

export default function Checkout() {
  const { user, token } = useUser();
  const [order, setOrder] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    console.log("checkout");
    async function checkoutOfCart() {
      try {
        const response = await checkout(user, token);
        console.log("Checked out: ", response);
        console.log("SASAS: ", response.orderedItems)
        setOrder(response.order);
        setOrderedItems(response.orderedItems);
      } catch (err) {
        console.error("Error while checking out: ", err);
      }
    }
    checkoutOfCart();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Order Successfully Placed</h2>

        <div className="bg-green-50 p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-bold text-green-800 mb-2">Order Details</h3>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-purple-800 mb-3">Ordered Items</h3>
          {orderedItems.map((item) => (
            <div key={item.id} className="border-b border-purple-200 py-2">
              <p><strong>Product:</strong> {item.product?.name || "N/A"}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>

  )
};