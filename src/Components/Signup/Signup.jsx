import React, { useState } from "react";
import "../css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../../Redux/formSlice";
import { singupCompany } from "../../api/auth";
import Button from "../ui/Button";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setSelectedFile(file);
      dispatch(updateField({ name, value: file.name }));
    } else {
      dispatch(updateField({ name, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formPayload = new FormData();
    formPayload.append("cmpID", formData.cmpID);
    formPayload.append("cmpName", formData.cmpName);
    formPayload.append("cmpAddress", formData.cmpAddress);
    formPayload.append("cmpEmail", formData.cmpEmail);
    formPayload.append("cmpContact", formData.cmpContact);
    if (selectedFile) {
      formPayload.append("cmpImage", selectedFile);
    }

    try {
      const res = await singupCompany(formPayload);
      alert("Form submitted successfully!");
      dispatch(resetForm());
      e.target.reset();
      setSelectedFile(null);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const res = await fetch("https://servermaltex.whdevs.com/company/addcompany", {
    //     method: "POST",
    //     body: data,
    //   });

    //   const result = await res.json();
    //   console.log("Server Response:", result);

    //   if (res.ok) {
    //     alert("Form submitted successfully!");
    //     dispatch(resetForm());
    //     e.target.reset();
    //   } else {
    //     alert(result.message || "Something went wrong!");
    //   }
    // } catch (err) {
    //   console.error("Error:", err);
    //   alert("Failed to connect to server");
    // }
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
          <Button
            type="submit"
            title={isLoading ? "Submitting..." : "Submit"}
            icon={isLoading ? "FaSpinner" : "FaPaperPlane"} 
            disabled={isLoading}
          />
        </div>

        <p className="form-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
