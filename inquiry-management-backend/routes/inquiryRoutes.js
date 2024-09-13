const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// CREATE an inquiry
router.post('/', async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const inquiry = await newInquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    console.log('Error in POST /inquiries:', err);
    res.status(500).json({ message: err.message });
  }
});

// READ all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (err) {
    console.log('Error in GET /inquiries:', err);
    res.status(500).json({ message: err.message });
  }
});

// READ an inquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json(inquiry);
  } catch (err) {
    console.log('Error in GET /inquiries/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an inquiry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json(updatedInquiry);
  } catch (err) {
    console.log('Error in PUT /inquiries/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE an inquiry by ID
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json({ message: 'Inquiry deleted' });
  } catch (err) {
    console.log('Error in DELETE /inquiries/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
