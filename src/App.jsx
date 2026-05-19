import { useEffect, useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cameras from "./pages/Cameras";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaCamera,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

function App() {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
  });

  const products = [
    {
      name: "Canon EOS R50",
      price: "$699",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Sony Alpha A6400",
      price: "$899",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Nikon Z50",
      price: "$799",
      image:
        "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/Camera/api/profile.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
          setEditForm({
            full_name: data.user.name,
            email: data.user.email,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutUser = async () => {
    const res = await fetch("http://localhost:8080/Camera/api/logout.php", {
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    setUser(null);
    setShowProfile(false);
  };

  const updateProfile = async () => {
    const res = await fetch(
      "http://localhost:8080/Camera/api/update_profile.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      }
    );

    const data = await res.json();
    alert(data.message);

    if (data.status === "success") {
      setUser(data.user);
      setEditMode(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="home">
        <nav className="navbar">
          <div className="logo">
            <FaCamera />
            LensHub
          </div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/cameras">Cameras</Link>
            </li>

            <li>
              <a href="#">Lenses</a>
            </li>

            <li>
              <a href="#">Accessories</a>
            </li>

            <li>
              <a href="#">Contact</a>
            </li>
          </ul>

          <div className="navButtons">
            {user ? (
              <button
                className="profileIconBtn"
                onClick={() => setShowProfile(true)}
              >
                <FaUserCircle />
                Profile
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="loginBtn">Login</button>
                </Link>

                <Link to="/register">
                  <button className="signupBtn">Sign Up</button>
                </Link>
              </>
            )}

            <button className="cart">
              <FaShoppingCart />
              Cart
            </button>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero">
                  <div className="heroText">
                    <span className="tag">Premium Camera Store</span>

                    <h1>Capture Every Moment Like a Pro</h1>

                    <p>
                      Explore professional cameras, lenses and accessories with
                      a clean modern shopping experience.
                    </p>

                    <div className="buttons">
                      <button className="primary">Shop Now</button>
                      <button className="secondary">Explore Collection</button>
                    </div>
                  </div>

                  <div className="heroImage">
                    <img
                      src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
                      alt="camera"
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

                  <p className="sectionText">
                    Best selling cameras for creators and professionals
                  </p>

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

                        <button>Add To Cart</button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="offer">
                  <h2>30% Off Camera Accessories</h2>

                  <p>
                    Get premium lenses, tripods and camera bags at special
                    prices.
                  </p>

                  <button>View Deals</button>
                </section>
              </>
            }
          />

          <Route path="/cameras" element={<Cameras />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {showProfile && user && (
          <div className="profileOverlay">
            <div className="profileModal">
              <button
                className="closeProfile"
                onClick={() => {
                  setShowProfile(false);
                  setEditMode(false);
                }}
              >
                ×
              </button>

              <FaUserCircle className="bigProfileIcon" />

              <h2>User Profile</h2>

              {!editMode ? (
                <>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <button
                    className="editProfileBtn"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>

                  <button className="logoutBtn" onClick={logoutUser}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        full_name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        email: e.target.value,
                      })
                    }
                  />

                  <button className="editProfileBtn" onClick={updateProfile}>
                    Save Changes
                  </button>

                  <button
                    className="cancelBtn"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;