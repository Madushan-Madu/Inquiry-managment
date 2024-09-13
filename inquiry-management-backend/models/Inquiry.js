const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  username: {  // Changed from name to username
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
