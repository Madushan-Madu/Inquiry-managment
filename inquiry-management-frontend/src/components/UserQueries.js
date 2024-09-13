import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserQueries.css';

const UserQueries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inquiries');
        setInquiries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setError('Failed to fetch inquiries.');
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/replies');
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
        setError('Failed to fetch replies.');
      }
    };

    fetchInquiries();
    fetchReplies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inquiries/${id}`);
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      setError('Failed to delete inquiry.');
    }
  };

  const repliesByInquiryId = replies.reduce((acc, reply) => {
    if (!acc[reply.inquiryId]) {
      acc[reply.inquiryId] = [];
    }
    acc[reply.inquiryId].push(reply);
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>My Queries</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>User Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Message</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Replies</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>No inquiries found</td>
            </tr>
          ) : (
            inquiries.map((inquiry) => {
              const hasReplies = repliesByInquiryId[inquiry._id] && repliesByInquiryId[inquiry._id].length > 0;

              return (
                <tr key={inquiry._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{inquiry.username}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{inquiry.email}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{inquiry.message}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {hasReplies ? (
                      <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {repliesByInquiryId[inquiry._id].map(reply => (
                          <li key={reply._id} style={{ marginBottom: '5px' }}>{reply.replyMessage}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No replies yet</span>
                    )}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {!hasReplies ? (
                      <>
                        <Link to={`/edit-inquiry/${inquiry._id}`} style={{ marginRight: '8px' }}>
                          <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
                      </>
                    ) : (
                      <span>Cannot Edit/Delete (Replied)</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserQueries;
