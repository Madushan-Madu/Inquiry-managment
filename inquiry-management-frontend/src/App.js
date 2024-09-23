import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUsForm from './components/ContactUsForm';
import UserQueries from './components/UserQueries';
import HRManagerQueries from './components/HRManagerQueries'; // Import the HRManagerQueries component
import ReplyForm from './components/ReplyForm'; // Import the ReplyForm component
import EditInquiryForm from './components/EditInquiryForm'; // Import the EditInquiryForm component
import Reports from './components/Reports'; // Import the Reports component
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ContactUsForm />} />
          <Route path="/queries" element={<UserQueries />} />
          <Route path="/hr-manager-queries" element={<HRManagerQueries />} /> {/* HR Manager's Queries */}
          <Route path="/reply/:id" element={<ReplyForm />} /> {/* Route for the reply form */}
          <Route path="/edit-inquiry/:id" element={<EditInquiryForm />} /> {/* Route for editing inquiry */}
          <Route path="/reports" element={<Reports />} /> {/* Route for reports */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
