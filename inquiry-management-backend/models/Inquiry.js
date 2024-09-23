const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  username: { // Changed from name to username
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Basic email validation
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
