import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/Camera/api/get_products.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p.id == id);
        setProduct(found);
      });
  }, [id]);

  const addCart = async () => {
    const res = await fetch("http://localhost:8080/Camera/api/add_cart.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  if (!product) {
    return <h1 style={{ padding: "150px" }}>Loading...</h1>;
  }

  return (
    <div className="detailsPage">
      <div className="detailsCard">
        <img
          src={product.image_url}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://placehold.co/700x500?text=No+Image";
          }}
        />

        <div className="detailsInfo">
          <h1>{product.title}</h1>
          <h2>${product.price}</h2>
          <p>{product.description}</p>

          <h3>
            {product.stock_status === "in_stock"
              ? `In Stock: ${product.quantity}`
              : "Stock Out"}
          </h3>

          <div className="detailsButtons">
            <button
              onClick={addCart}
              disabled={product.stock_status === "stock_out"}
            >
              Add To Cart
            </button>

            <Link to={`/checkout/${product.id}`}>
              <button disabled={product.stock_status === "stock_out"}>
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;