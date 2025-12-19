// Needed Resources 
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities");
const reviewModel = require("../models/review-model.js")

// // Add review
// router.post(
//   "/add",
//   reviewController.addReview
// );

// // Edit review view
// router.get(
//   "/edit/:review_id",
//   reviewController.buildEditReview
// );

// // Update review
// router.post(
//   "/update",
//   reviewController.updateReview
// );

// // Delete review
// router.post(
//   "/delete",
//   utilities.requireEmployeeOrAdmin,
//   reviewController.deleteReview
// );



// Admin view for reviews (only employee/admin)
router.get(
  "/admin",
//   utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(reviewController.buildAdmin)
)

// Add a review (POST)
router.post(
  "/add",
//   utilities.setLoggedInStatus, 
  utilities.handleErrors(reviewController.addReview)
)

// Edit a review form (GET)
router.get(
  "/edit/:reviewId",
//   utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(reviewController.buildEditReviewForm)
)

// Update a review (POST)
router.post(
  "/update",
//   utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(reviewController.updateReview)
)

// Delete a review (POST or GET depending on your form setup)
router.post(
  "/delete",
//   utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(reviewController.deleteReview)
)




module.exports = router;
