import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    const res = await fetch("http://localhost:8080/Camera/api/login.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);

    if (data.status === "success") {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h1>Login</h1>
        <p>Welcome back to LensHub</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="button" onClick={loginUser}>
          Login
        </button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;