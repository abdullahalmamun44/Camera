import "./App.css";
import { FaShoppingCart, FaCamera, FaStar } from "react-icons/fa";

function App() {
  const products = [
    {
      name: "Canon EOS R50",
      price: "$699",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Sony Alpha A6400",
      price: "$899",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Nikon Z50",
      price: "$799",
      image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const cameras = [
  {
    name: "Canon EOS R50",
    category: "Mirrorless Camera",
    price: "$699",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sony Alpha A6400",
    category: "Creator Camera",
    price: "$899",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Nikon Z50",
    category: "Travel Camera",
    price: "$799",
    image:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fujifilm X-T30 II",
    category: "Street Photography",
    price: "$949",
    image:
      "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?auto=format&fit=crop&w=900&q=80",
  },
];
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">
          <FaCamera />
          LensHub
        </div>

        <ul>
          <li>Home</li>
          <li>Cameras</li>
          <li>Lenses</li>
          <li>Accessories</li>
          <li>Contact</li>
        </ul>

        <div className="navButtons">
  <button className="loginBtn">Login</button>

  <button className="signupBtn">Sign Up</button>

  <button className="cart">
    <FaShoppingCart /> Cart
  </button>
</div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <span className="tag">Premium Camera Store</span>
          <h1>Capture Every Moment Like a Pro</h1>
          <p>
            Explore professional cameras, lenses, and accessories with a clean,
            modern shopping experience.
          </p>

          <div className="buttons">
            <button className="primary">Shop Now</button>
            <button className="secondary">Explore Collection</button>
          </div>
        </div>

        <div className="heroImage">
          <img
            src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
            alt="Camera"
          />
        </div>
      </section>

      <section className="brands">
        <span>Canon</span>
        <span>Sony</span>
        <span>Nikon</span>
        <span>Fujifilm</span>
        <span>Panasonic</span>
      </section>

      <section className="products">
        <h2>Popular Cameras</h2>
        <p className="sectionText">Best selling cameras for creators and professionals</p>

        <div className="productGrid">
          {products.map((product, index) => (
            <div className="card" key={index}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>

              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <h4>{product.price}</h4>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="offer">
        <h2>30% Off Camera Accessories</h2>
        <p>Get premium lenses, tripods, and camera bags at special prices.</p>
        <button>View Deals</button>
      </section>
    </div>
  );
}

export default App;