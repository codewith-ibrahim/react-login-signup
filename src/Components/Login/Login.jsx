import React, { useState } from "react";
import "../css/Form.css";

const Login = () => {

  const initialState = {
    cmpID: "",
    cmpName: "",
    cmpAddress: "",
    cmpEmail: "",
    cmpContact: "",
    cmpImage: null
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const data = new FormData();
    data.append("cmpID", formData.companyID);
    data.append("cmpName", formData.companyName);
    data.append("cmpAddress", formData.companyAddress);
    data.append("cmpEmail", formData.companyEmail);
    data.append("cmpContact", formData.companyContact);
    data.append("cmpImage", formData.companyImage);

    e.target.reset();

    setFormData(initialState);

  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="heading">Login</h3>

        <label htmlFor="cmpID">Company ID</label>
        <input type="number" id="cmpID" value={formData.cmpID} onChange={handleChange} name="cmpID" />

        <label htmlFor="cmpName">Company Name</label>
        <input type="text" id="cmpName" value={formData.cmpName} onChange={handleChange} name="cmpName" />

        <label htmlFor="cmpAddress">Addres</label>
        <input type="text" id="cmpAddress" value={formData.cmpAddress} onChange={handleChange} name="cmpAddress" />

        <label htmlFor="cmpEmail">Email</label>
        <input type="email" id="cmpEmail" value={formData.cmpEmail} onChange={handleChange} name="cmpEmail" />

        <label htmlFor="cmpContact">Contact Number</label>
        <input type="tel" id="cmpContact" value={formData.cmpContact} onChange={handleChange} name="cmpContact" />

        <label htmlFor="cmpImage">Upload Image</label>
        <input type="file" id="cmpImage" name="cmpImage" onChange={handleChange} />
        <div className="btnWraper">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
