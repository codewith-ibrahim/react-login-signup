import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice";
import Button from "../ui/Button";
import "../css/Form.css";

const Login = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const cmpID = form.get("cmpID");
    const cmpEmail = form.get("cmpEmail");

    isSubmitting(true);

    try {
      const res = await fetch("https://servermaltex.whdevs.com/company/addcompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmpID, cmpEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(loginSuccess(data.data));
        alert("Logged in successfully");
        e.target.reset();
      } else {
        alert((data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong, please try again later.");
    } finally {
      isSubmitting(false)
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="heading">Login</h3>

        <label htmlFor="cmpID">Company ID</label>
        <input
          type="number"
          id="cmpID"
          name="cmpID"
          placeholder="Enter your company ID"
          required
        />

        <label htmlFor="cmpEmail">Email</label>
        <input
          type="email"
          id="cmpEmail"
          name="cmpEmail"
          placeholder="Enter your email"
          required
        />

        <div className="btnWraper">
          <Button type="submit" title="Login" icon="FaSignInAlt"/>
        </div>

        <p className="form-link">
          Don’t have an account?{" "}
          <a href="/signup" className="form-link-anchor">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
