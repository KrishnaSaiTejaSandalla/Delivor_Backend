const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Add Firm Controller
const addFirm = async (req, res) => {
  try {
    let { Name, area, category, collections, offer } = req.body;

    // Parse category & collections if sent as JSON strings
    if (typeof category === 'string') category = JSON.parse(category);
    if (typeof collections === 'string') collections = JSON.parse(collections);

    if (!Name || !area || !category || !collections) {
      return res.status(400).json({ message: "Name, area, category, and collections are required" });
    }

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    if (!Array.isArray(vendor.firm)) vendor.firm = [];

    if (vendor.firm.length > 0) {
      return res.status(400).json({ message: "Vendor can have only one firm" });
    }

    const normalizedCategory = category.map(c => c.toLowerCase());
    const normalizedCollections = collections.map(c => c.toLowerCase());

    const firm = new Firm({
      Name,
      area,
      category: normalizedCategory,
      collections: normalizedCollections,
      offer,
      image,
      vendor: vendor._id
    });

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm._id);
    await vendor.save();

    return res.status(200).json({
      message: 'Firm added successfully',
      firmId: savedFirm._id,
      vendorFirmName: savedFirm.Name
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete firm
const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);

    if (!deletedFirm) return res.status(404).json({ error: "No Firm Found" });

    res.status(200).json({
      message: "Firm deleted successfully",
      deletedFirm
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById };
