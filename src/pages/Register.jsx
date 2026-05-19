import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    console.log("Button clicked");
    console.log(form);

    try {
      const res = await fetch("http://localhost:8080/Camera/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(data.message);

      if (data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      alert("Connection failed. Check Apache, MySQL, and API URL.");
      console.log(error);
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h1>Create Account</h1>
        <p>Join LensHub today</p>

        <input
          name="full_name"
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="button" onClick={registerUser}>
          Create Account
        </button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;