import React, { useState } from "react";
import "../css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../../formSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    dispatch(updateField({name, value: files ? files[0] : value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    dispatch(resetForm());
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="heading">Signup</h3>

        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          name="name"
        />

        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={handleChange}
          name="company"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />

        <label htmlFor="contact">Contact Number</label>
        <input
          type="tel"
          id="contact"
          value={formData.contact}
          onChange={handleChange}
          name="contact"
        />

        <label htmlFor="address">Addres</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={handleChange}
          name="address"
        />

        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" onChange={handleChange} />
        <div className="btnWraper">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
