const express = require("express");
const router = express.Router();
const upload = require("../../utils/multer");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;