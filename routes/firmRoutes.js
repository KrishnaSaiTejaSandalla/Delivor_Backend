const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const path = require('path');

const router = express.Router();

// Add firm (with token verification)
router.post('/add-firm', verifyToken, firmController.addFirm);

// Serve uploaded images
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg'); // Fixed header
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// Delete firm (optional: add verifyToken to restrict to vendor)
router.delete('/:firmId', verifyToken, firmController.deleteFirmById);

module.exports = router;
