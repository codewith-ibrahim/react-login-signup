import React from "react";
import "./Login.css";   

const Login = () => {
  return (
    <div className="wrapper">
      <form className="form">
        <h3 className="heading">Login</h3>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="Compname">Company Name</label>
        <input type="text" id="Compname" name="Compname" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="contact">Contact Number</label>
        <input type="number" id="contact" name="contact" />

        <label htmlFor="address">Addres</label>
        <input type="text" id="address" name="address" />

        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" />
      </form>
    </div>
  );
};

export default Login;
