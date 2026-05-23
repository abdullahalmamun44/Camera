import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cameras.css";

function CategoryPage({ title, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/Camera/api/get_products.php?category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, [category]);

  return (
    <div className="cameraPage">
      <h1>{title}</h1>

      <div className="cameraGrid">
        {products.map((item) => (
          <div className="cameraCard" key={item.id}>

            <img
              src={item.image_url}
              alt={item.title}
              onError={(e)=>{
                e.target.src="https://placehold.co/500x350?text=No+Image";
              }}
            />

            <div className="cameraInfo">

              <h3>{item.title}</h3>

              <h4>${item.price}</h4>

              <span
              className={
                item.stock_status==="in_stock"
                ?
                "stockIn"
                :
                "stockOut"
              }
              >
              {
                item.stock_status==="in_stock"
                ?
                `In Stock (${item.quantity})`
                :
                "Stock Out"
              }
              </span>

              <Link to={`/product/${item.id}`}>
                <button className="buyBtn">
                  View Details
                </button>
              </Link>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;