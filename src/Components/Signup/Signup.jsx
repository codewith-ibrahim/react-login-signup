import React from "react";
import "../Css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../../Redux/formSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;
    dispatch(updateField({ name, value: fieldValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("cmpID", formData.cmpID);
    data.append("cmpName", formData.cmpName);
    data.append("cmpAddress", formData.cmpAddress);
    data.append("cmpEmail", formData.cmpEmail);
    data.append("cmpContact", formData.cmpContact);
    data.append("cmpImage", formData.cmpImage);

    try {
      const res = await fetch("https://servermaltex.whdevs.com/company/addcompany", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("Server Response:", result);

      if (res.ok) {
        alert("Form submitted successfully!");
        dispatch(resetForm());
        e.target.reset();
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to server");
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="heading">Signup</h3>

        <label htmlFor="cmpID">Company ID</label>
        <input
          type="number"
          id="cmpID"
          name="cmpID"
          value={formData.cmpID}
          onChange={handleChange}
        />

        <label htmlFor="cmpName">Company Name</label>
        <input
          type="text"
          id="cmpName"
          name="cmpName"
          value={formData.cmpName}
          onChange={handleChange}
        />

        <label htmlFor="cmpAddress">Address</label>
        <input
          type="text"
          id="cmpAddress"
          name="cmpAddress"
          value={formData.cmpAddress}
          onChange={handleChange}
        />

        <label htmlFor="cmpEmail">Email</label>
        <input
          type="email"
          id="cmpEmail"
          name="cmpEmail"
          value={formData.cmpEmail}
          onChange={handleChange}
        />

        <label htmlFor="cmpContact">Contact Number</label>
        <input
          type="tel"
          id="cmpContact"
          name="cmpContact"
          value={formData.cmpContact}
          onChange={handleChange}
        />

        <label htmlFor="cmpImage">Upload Image</label>
        <input
          type="file"
          id="cmpImage"
          name="cmpImage"
          onChange={handleChange}
        />

        <div className="btnWraper">
          <button type="submit">Submit</button>
        </div>

        <p className="form-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
