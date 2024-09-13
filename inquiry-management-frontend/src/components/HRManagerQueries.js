// src/components/HRManagerQueries.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/hrManagerQueries.css';

const HRManagerQueries = () => {
  const [queries, setQueries] = useState([]);
  const [replies, setReplies] = useState([]); // To store replies

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/replies');
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchQueries();
    fetchReplies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inquiries/${id}`);
      setQueries(queries.filter(query => query._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>User Inquiries</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map(query => (
            <tr key={query._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{query.message}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <Link to={`/reply/${query._id}`} style={{ marginRight: '10px' }}>
                  <button>Reply</button>
                </Link>
                <button onClick={() => handleDelete(query._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Replies</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reply Message</th>
          </tr>
        </thead>
        <tbody>
          {replies.map(reply => (
            <tr key={reply._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reply.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reply.replyMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRManagerQueries;
