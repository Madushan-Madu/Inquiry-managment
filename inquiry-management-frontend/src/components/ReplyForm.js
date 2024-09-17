// src/components/ReplyForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/replyForm.css";
import SendIcon from "@mui/icons-material/Send";
import { createNotify } from "./ToastMessages";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListAltIcon from '@mui/icons-material/ListAlt';


const ReplyForm = () => {
  const { id } = useParams(); // Get the inquiry ID from URL parameters
  const [replyMessage, setReplyMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [username, setUsername] = useState(""); // State to store username
  const [isSubmitted, setIsSubmitted] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/inquiries/${id}`
        );
        setUsername(response.data.username); // Set the username from the inquiry
      } catch (error) {
        console.error("Error fetching inquiry:", error);
        setStatusMessage("Failed to fetch inquiry details.");
      }
    };

    fetchInquiry();
  }, [id]);

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/replies`, {
        inquiryId: id,
        username,
        replyMessage,
      });
      setIsSubmitted(true);
      
      createNotify("Reply sent successfully!");
      setStatusMessage("Reply sent successfully!");
      setReplyMessage("");
      // navigate("/hr-manager-queries"); // Navigate back to HR Manager Queries page
    } catch (error) {
      console.error("Error sending reply:", error);
      setStatusMessage("Failed to send reply. Please try again.");
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
            Reply was successful!
          </p>
            <button className=" btn btn-warning fw-bold mt-5" style={{width:"100%"}} onClick={()=>{navigate("/hr-manager-queries")}}><ListAltIcon/>{" "}View inquiries</button>
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
            Reply to Inquiry
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
                htmlFor="inquiryId"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Inquiry ID
              </label>
              <input
                type="text"
                id="inquiryId"
                name="inquiryId"
                value={id}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                className="form-control"
              />
            </div>
            <div className=" mt-4">
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
                value={username}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                className="form-control"
              />
            </div>
            <div className=" mt-4">
              <label
                className="form-label fw-bold"
                htmlFor="replyMessage"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Reply Message
              </label>
              <textarea
                id="replyMessage"
                name="replyMessage"
                value={replyMessage}
                onChange={handleReplyChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                className="form-control"
              ></textarea>
            </div>
            <button
              className=" w-100 rounded-3 mt-4"
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              <SendIcon /> Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReplyForm;
