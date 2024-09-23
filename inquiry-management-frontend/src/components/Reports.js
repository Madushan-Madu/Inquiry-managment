import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/reports.css'; // Import your CSS file

const Reports = () => {
  const [inquiries, setInquiries] = useState([]);
  const [totalInquiries, setTotalInquiries] = useState(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiries'); // Adjust URL as necessary
        setInquiries(response.data);
        setTotalInquiries(response.data.length); // Update total inquiries
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Reports Overview</h1>
      <div className="report-card">
        <h3>Total Inquiries: {totalInquiries}</h3>
        <p>Details about the inquiries...</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Inquiry ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(inquiry => (
            <tr key={inquiry._id}>
              <td>{inquiry._id}</td>
              <td>{inquiry.username}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn">Download Report</button>
    </div>
  );
};

export default Reports;
