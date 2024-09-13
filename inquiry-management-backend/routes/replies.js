// routes/replies.js

const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply'); // Import the Reply model

// CREATE a reply
router.post('/', async (req, res) => {
  try {
    // Ensure the request body includes username and other fields
    const { inquiryId, username, replyMessage } = req.body;
    if (!username || !replyMessage) {
      return res.status(400).json({ message: 'Username and reply message are required' });
    }
    
    const newReply = new Reply({
      inquiryId,
      username,
      replyMessage
    });
    
    const reply = await newReply.save();
    res.status(201).json(reply);
  } catch (err) {
    console.log('Error in POST /replies:', err);
    res.status(500).json({ message: err.message });
  }
});

// READ all replies
router.get('/', async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).json(replies);
  } catch (err) {
    console.log('Error in GET /replies:', err);
    res.status(500).json({ message: err.message });
  }
});

// READ a reply by ID
router.get('/:id', async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });
    res.status(200).json(reply);
  } catch (err) {
    console.log('Error in GET /replies/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a reply by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, replyMessage } = req.body;
    const updatedReply = await Reply.findByIdAndUpdate(req.params.id, { username, replyMessage }, { new: true });
    if (!updatedReply) return res.status(404).json({ message: 'Reply not found' });
    res.status(200).json(updatedReply);
  } catch (err) {
    console.log('Error in PUT /replies/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE a reply by ID
router.delete('/:id', async (req, res) => {
  try {
    const reply = await Reply.findByIdAndDelete(req.params.id);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });
    res.status(200).json({ message: 'Reply deleted' });
  } catch (err) {
    console.log('Error in DELETE /replies/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
