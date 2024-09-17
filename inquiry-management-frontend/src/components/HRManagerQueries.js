// src/components/HRManagerQueries.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/hrManagerQueries.css";
import { deleteToastify } from "./ToastMessages";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import ReplyIcon from '@mui/icons-material/Reply';

const HRManagerQueries = () => {
  const [queries, setQueries] = useState([]);
  const [replies, setReplies] = useState([]); // To store replies

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/inquiries");
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/replies");
        setReplies(response.data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    fetchQueries();
    fetchReplies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inquiries/${id}`);
      setQueries(queries.filter((query) => query._id !== id));
      deleteToastify("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  return (
    <div className=' container d-flex justify-content-center ' style={{ height:'auto' }}>
            <div className=' w-80   p-3 px-5 h-auto' >
            <p className=' mt-3' style={{fontWeight:600,fontSize:'50px',color:"#1c71bb"}}>User Inquiries</p>

            <table className=' table rounded-lg mt-5 mb-3' style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
          <tr>
            <th className=' bg-primary text-white' >
              Username
            </th>
            <th className=' bg-primary text-white' >Email</th>
            <th className=' bg-primary text-white' >
              Message
            </th>
            <th className=' bg-primary text-white' style={{minWidth:"230px"}}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className=' table-hover'>
          {queries.map((query) => (
            <tr key={query._id}>
              <td >
                {query.username}
              </td>
              <td >
                {query.email}
              </td>
              <td >
                {query.message}
              </td>
              <td >
                <Link
                  to={`/reply/${query._id}`}
                  style={{ marginRight: "10px" }}
                >
                  <button className="icon-btn btn btn-success" style={{backgroundColor:"#1ea524"}} ><ReplyIcon/>{" "}Reply</button>
                </Link>
                <button className="icon-btn btn btn-danger" onClick={() => handleDelete(query._id)}><DeleteIcon />{" "}Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className=' mt-5' style={{fontWeight:600,fontSize:'50px',color:"#1c71bb"}}>Replies</p>

      <table className=' table rounded-lg mt-5 mb-3' style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
          <tr>
            <th className=' bg-primary text-white'>
              Username
            </th>
            <th className=' bg-primary text-white'>
              Reply Message
            </th>
          </tr>
        </thead>
        <tbody className=' table-hover'>
          {replies.map((reply) => (
            <tr key={reply._id}>
              <td >
                {reply.username}
              </td>
              <td >
                {reply.replyMessage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default HRManagerQueries;
