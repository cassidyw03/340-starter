// Needed Resources 
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities");

// Add review
router.post(
  "/add",
  utilities.checkLogin,
  reviewController.addReview
);

// Edit review view
router.get(
  "/edit/:review_id",
  utilities.checkLogin,
  reviewController.buildEditReview
);

// Update review
router.post(
  "/update",
  utilities.checkLogin,
  reviewController.updateReview
);

// Delete review
router.post(
  "/delete",
  utilities.checkLogin,
  reviewController.deleteReview
);

module.exports = router;
