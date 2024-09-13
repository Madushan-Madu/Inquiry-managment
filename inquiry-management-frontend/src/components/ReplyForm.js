// src/components/ReplyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/replyForm.css';

const ReplyForm = () => {
  const { id } = useParams();  // Get the inquiry ID from URL parameters
  const [replyMessage, setReplyMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [username, setUsername] = useState('');  // State to store username

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inquiries/${id}`);
        setUsername(response.data.username);  // Set the username from the inquiry
      } catch (error) {
        console.error('Error fetching inquiry:', error);
        setStatusMessage('Failed to fetch inquiry details.');
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
        replyMessage
      });
      setStatusMessage('Reply sent successfully!');
      setReplyMessage('');
      navigate('/hr-manager-queries');  // Navigate back to HR Manager Queries page
    } catch (error) {
      console.error('Error sending reply:', error);
      setStatusMessage('Failed to send reply. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Reply to Inquiry</h2>
      {statusMessage && <p style={{ color: statusMessage.includes('Failed') ? 'red' : 'green' }}>{statusMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="inquiryId" style={{ display: 'block', marginBottom: '5px' }}>Inquiry ID</label>
          <input
            type="text"
            id="inquiryId"
            name="inquiryId"
            value={id}
            readOnly
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            readOnly
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="replyMessage" style={{ display: 'block', marginBottom: '5px' }}>Reply Message</label>
          <textarea
            id="replyMessage"
            name="replyMessage"
            value={replyMessage}
            onChange={handleReplyChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
};

export default ReplyForm;
