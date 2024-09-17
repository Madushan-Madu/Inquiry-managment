import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editInquiryForm.css";
import { updateNotify } from "./ToastMessages";
import { Bounce, ToastContainer, toast } from 'react-toastify';


const EditInquiryForm = () => {
  const { id } = useParams(); // Get the inquiry ID from URL parameters
  const [inquiry, setInquiry] = useState(null);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/inquiries/${id}`
        );
        setInquiry(response.data);
        setMessage(response.data.message); // Set initial message
      } catch (error) {
        console.error("Error fetching inquiry:", error);
        setStatusMessage("Failed to fetch inquiry.");
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/inquiries/${id}`, { message });
      updateNotify("Inquiry updated successfully!")
     
      setStatusMessage("Inquiry updated successfully!");
      setTimeout(() => {
        setLoading(false)
        navigate("/queries"); // Navigate back to User Queries page

      }, 1000);
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setStatusMessage("Failed to update inquiry. Please try again.");
    }
  };

  if (!inquiry) return <p>Loading...</p>;

  return (
    <div
      className=" container d-flex justify-content-center"
      style={{ margin: "0 auto" }}
    >
      {" "}
      {loading?<div class="spinner-border text-primary" style={{width:"2rem",fontSize:"2rem",marginTop:"100px"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>:
      <div
        className=" card shadow-sm d-flex flex-column align-items-center justify-content-center w-50 p-5 mt-5"
        style={{ backgroundColor: "#eaf5ff" }}
      >
        <p
          className=""
          style={{ fontWeight: 600, fontSize: "40px", color: "#1c71bb" }}
        >
          Edit Inquiry
        </p>
        {/* {statusMessage && (
          <p
            style={{
              color: statusMessage.includes("Failed") ? "red" : "green",
            }}
          >
            {statusMessage}
          </p>
        )} */}
        <form className=" w-100" onSubmit={handleSubmit}>
          <div className=" mt-4">
            <label
              className=" form-label"
              htmlFor="message"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              className=" form-control"
            ></textarea>
          </div>
          <button
            className=" w-100 rounded-3 mt-4"
            type="submit"
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Update
          </button>
        </form>
      </div>
}
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
        
      />{" "}
    </div>
  );
};

export default EditInquiryForm;
