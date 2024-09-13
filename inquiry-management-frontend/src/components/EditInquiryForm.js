import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editInquiryForm.css'; 

const EditInquiryForm = () => {
  const { id } = useParams(); // Get the inquiry ID from URL parameters
  const [inquiry, setInquiry] = useState(null);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inquiries/${id}`);
        setInquiry(response.data);
        setMessage(response.data.message); // Set initial message
      } catch (error) {
        console.error('Error fetching inquiry:', error);
        setStatusMessage('Failed to fetch inquiry.');
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/inquiries/${id}`, { message });
      setStatusMessage('Inquiry updated successfully!');
      navigate('/user-queries'); // Navigate back to User Queries page
    } catch (error) {
      console.error('Error updating inquiry:', error);
      setStatusMessage('Failed to update inquiry. Please try again.');
    }
  };

  if (!inquiry) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Edit Inquiry</h2>
      {statusMessage && <p style={{ color: statusMessage.includes('Failed') ? 'red' : 'green' }}>{statusMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Update</button>
      </form>
    </div>
  );
};

export default EditInquiryForm;
