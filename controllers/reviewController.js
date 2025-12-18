const reviewModel = require("../models/review-model");

/* ***************************
 *  Add New Review
 * ************************** */
async function addReview(req, res) {
  try {
    const { review_text, inv_id, account_id } = req.body;

    // Server-side validation
    if (!review_text || !inv_id || !account_id) {
      req.flash("error", "Review cannot be empty.");
      return res.redirect(`/inventory/detail/${inv_id}`);
    }

    await reviewModel.addReview(review_text, inv_id, account_id);

    req.flash("success", "Review added successfully.");
    res.redirect(`/inventory/detail/${inv_id}`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add review.");
    res.redirect("back");
  }
}

/* ***************************
 *  Deliver Edit Review View
 * ************************** */
async function buildEditReview(req, res) {
  const review_id = req.params.review_id;

  try {
    const review = await reviewModel.getReviewById(review_id);
    res.render("reviews/edit-review", {
      title: "Edit Review",
      review
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load review.");
    res.redirect("/account");
  }
}

/* ***************************
 *  Update Review
 * ************************** */
async function updateReview(req, res) {
  const { review_id, review_text } = req.body;

  if (!review_text) {
    req.flash("error", "Review text cannot be empty.");
    return res.redirect("back");
  }

  try {
    await reviewModel.updateReview(review_id, review_text);
    req.flash("success", "Review updated successfully.");
    res.redirect("/account");
  } catch (error) {
    console.error(error);
    req.flash("error", "Update failed.");
    res.redirect("/account");
  }
}

/* ***************************
 *  Delete Review
 * ************************** */
async function deleteReview(req, res) {
  const { review_id } = req.body;

  try {
    await reviewModel.deleteReview(review_id);
    req.flash("success", "Review deleted.");
    res.redirect("/account");
  } catch (error) {
    console.error(error);
    req.flash("error", "Delete failed.");
    res.redirect("/account");
  }
}

module.exports = {
  addReview,
  buildEditReview,
  updateReview,
  deleteReview
};
