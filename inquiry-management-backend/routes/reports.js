const express = require('express');
const Inquiry = require('../models/Inquiry'); // Adjust path based on your structure
const json2csv = require('json2csv').parse; // For CSV export
const router = express.Router();

// Existing report route
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({});
    const totalInquiries = inquiries.length;
    res.json({ totalInquiries, inquiries });
  } catch (error) {
    res.status(500).send('Error retrieving reports');
  }
});

// New route for downloading the report
router.get('/download', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({});
    const csv = json2csv(inquiries);

    res.header('Content-Type', 'text/csv');
    res.attachment('inquiries_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send('Error generating report');
  }
});

module.exports = router;
