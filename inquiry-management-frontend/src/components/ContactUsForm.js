import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../styles/contactUsForm.css';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/inquiries', formData);
      console.log('Inquiry submitted:', response.data);
      setStatusMessage('Inquiry submitted successfully!');
      setFormData({ username: '', email: '', message: '' });
      setErrors({});
      navigate('/queries');  // Navigate to UserQueries page after successful submission
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatusMessage('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Contact Us</h2>
      {statusMessage && <p style={{ color: statusMessage.includes('Failed') ? 'red' : 'green' }}>{statusMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default ContactUsForm;
