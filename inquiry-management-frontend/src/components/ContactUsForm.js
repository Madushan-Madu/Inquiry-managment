import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/contactUsForm.css";
import { Card } from "@mui/material";
import { createNotify } from "./ToastMessages";
import { Bounce, ToastContainer, toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListAltIcon from '@mui/icons-material/ListAlt';


const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formData, "inq");

      const response = await axios.post(
        "http://localhost:5000/inquiries",
        formData
      );
      createNotify("Inquiry submitted successfully!");
      console.log("Inquiry submitted:", response.data);
      setStatusMessage("Inquiry submitted successfully!");
      setIsSubmitted(true);
      setFormData({ username: "", email: "", message: "" });
      setErrors({});
      // navigate('/queries');  // Navigate to UserQueries page after successful submission
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatusMessage("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div
      className=" container d-flex justify-content-center"
      style={{ margin: "0 auto" }}
    >
      {isSubmitted ? (
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <CheckCircleIcon style={{ color: "#36b936", fontSize: "60px" }} />
          <p className="mt-5" style={{ fontSize: "50px", color: "black" }}>
            Thanks for contacting us !
          </p>
          <button className=" btn btn-warning fw-bold mt-5" style={{width:"100%"}} onClick={()=>{navigate("/queries")}}><ListAltIcon/>{" "}View my inquiries</button>

          
        </div>
      ) : (
        <div
          className=" card shadow-sm d-flex flex-column align-items-center justify-content-center w-50 p-5 mt-5"
          style={{ backgroundColor: "#eaf5ff" }}
        >
          <p
            className=""
            style={{ fontWeight: 600, fontSize: "40px", color: "#1c71bb" }}
          >
            Contact us
          </p>
          {statusMessage && (
            <p
              style={{
                color: statusMessage.includes("Failed") ? "red" : "green",
              }}
            >
              {statusMessage}
            </p>
          )}
          <form className=" w-100" onSubmit={handleSubmit}>
            <div>
              <label
                className="form-label fw-bold"
                htmlFor="username"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
            </div>
            <div className=" mt-4">
              <label
                className="form-label fw-bold"
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className=" mt-4">
              <label
                className="form-label fw-bold"
                htmlFor="message"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              ></textarea>
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message}</p>
              )}
            </div>
            <button
              className=" w-100 rounded-3 mt-4"
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default ContactUsForm;
