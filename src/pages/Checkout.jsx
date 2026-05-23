import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [order, setOrder] = useState({
    address: "",
    phone: "",
    payment_method: "Cash on Delivery",
    quantity: 1,
  });

  useEffect(() => {
    fetch("http://localhost:8080/Camera/api/get_products.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p.id == id);
        setProduct(found);
      });
  }, [id]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    const res = await fetch("http://localhost:8080/Camera/api/place_order.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        ...order,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (data.status === "success") {
      window.location.href = "/";
    }
  };

  if (!product) {
    return <h1 style={{ padding: "150px" }}>Loading...</h1>;
  }

  const total = Number(product.price) * Number(order.quantity);

  return (
    <div className="checkoutPage">
      <div className="checkoutBox">
        <h1>Checkout</h1>

        <div className="checkoutGrid">
          <div className="checkoutForm">
            <h2>Delivery Information</h2>

            <input
              name="phone"
              placeholder="Phone Number"
              value={order.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={order.address}
              onChange={handleChange}
            />

            <select
              name="payment_method"
              value={order.payment_method}
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>Bkash</option>
              <option>Nagad</option>
              <option>Card Payment</option>
            </select>

            <input
              name="quantity"
              type="number"
              min="1"
              max={product.quantity}
              value={order.quantity}
              onChange={handleChange}
            />

            <button onClick={placeOrder}>Place Order</button>
          </div>

          <div className="orderSummary">
            <h2>Order Summary</h2>

            <img
              src={product.image_url}
              alt={product.title}
              onError={(e) => {
                e.target.src = "https://placehold.co/500x350?text=No+Image";
              }}
            />

            <h3>{product.title}</h3>

            <p>{product.description}</p>

            <h4>Price: ${product.price}</h4>

            <h4>Quantity: {order.quantity}</h4>

            <h2>Total: ${total}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;