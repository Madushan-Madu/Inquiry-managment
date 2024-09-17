import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserQueries.css';
import { deleteToastify } from './ToastMessages';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Bounce, ToastContainer, toast } from 'react-toastify';


const UserQueries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');
const navigate = useNavigate();
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
      await axios.delete(`http://localhost:5000/inquiries/${id}`)
        deleteToastify("Deleted successfully!")

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
    <div className=' container d-flex justify-content-center ' style={{ height:'auto' }}>
      <div className=' w-80   p-3 px-5 h-auto' >
      <p className=' mt-3' style={{fontWeight:600,fontSize:'50px',color:"#1c71bb"}}>My Queries</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className=' d-flex align-items-end justify-content-end' style={{width:"100%"}}>
        <button className=' btn btn-success' onClick={()=>{navigate("/")}} style={{backgroundColor:"#1ea524"}}><AddIcon />{" "} Add</button>
      </div>
      <table className=' table rounded-lg mt-5 mb-3' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead className=' '>
          <tr className=''>
            <th className=' bg-primary text-white' >User Name</th>
            <th className=' bg-primary text-white' >Email</th>
            <th className=' bg-primary text-white' >Message</th>
            <th className=' bg-primary text-white' >Replies</th>
            <th className=' bg-primary text-white' style={{minWidth:"230px"}}>Action</th>
          </tr>
        </thead>
        <tbody className=' table-hover'>
          {inquiries.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>No inquiries found</td>
            </tr>
          ) : (
            inquiries.map((inquiry) => {
              const hasReplies = repliesByInquiryId[inquiry._id] && repliesByInquiryId[inquiry._id].length > 0;

              return (
                <tr key={inquiry._id}>
                  <td >{inquiry.username}</td>
                  <td >{inquiry.email}</td>
                  <td >{inquiry.message}</td>
                  <td >
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
                   <td >
                    {!hasReplies ? (
                      <>
                        <Link to={`/edit-inquiry/${inquiry._id}`} style={{ marginRight: '8px' }}>
                          <button className="icon-btn btn btn-warning"><EditNoteIcon/>{" "} Edit</button>
                        </Link>
                        <button className="icon-btn btn btn-danger" onClick={() => handleDelete(inquiry._id)}><DeleteIcon />{" "}Delete</button>
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

export default UserQueries;
