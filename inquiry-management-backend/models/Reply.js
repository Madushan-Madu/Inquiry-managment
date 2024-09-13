// models/Reply.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry', required: true },
  username: { type: String, required: true }, // Add this line
  replyMessage: { type: String, required: true }
});

module.exports = mongoose.model('Reply', replySchema);
