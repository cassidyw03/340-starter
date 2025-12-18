const pool = require("../database/")

// Get all reviews for a specific inventory item (most recent first)
const getReviewsByInventoryId = async (inv_id) => {
    const query = `
        SELECT r.review_id, r.review_text, r.review_date, a.first_name, a.last_name
        FROM review r
        JOIN account a ON r.account_id = a.account_id
        WHERE r.inv_id = $1
        ORDER BY r.review_date DESC;
    `;
    const { rows } = await db.query(query, [inv_id]);
    return rows;
};

// Add a new review
const addReview = async (review_text, inv_id, account_id) => {
    const query = `
        INSERT INTO review (review_text, inv_id, account_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [review_text, inv_id, account_id]);
    return rows[0];
};

// Update a review (only text can be updated)
const updateReview = async (review_id, review_text) => {
    const query = `
        UPDATE review
        SET review_text = $1
        WHERE review_id = $2
        RETURNING *;
    `;
    const { rows } = await db.query(query, [review_text, review_id]);
    return rows[0];
};

// Delete a review
const deleteReview = async (review_id) => {
    const query = `
        DELETE FROM review
        WHERE review_id = $1;
    `;
    await db.query(query, [review_id]);
};

// Get review by id
const getReviewById = async (review_id) => {
  const sql = `
    SELECT * FROM review
    WHERE review_id = $1
  `;
  const data = await db.query(sql, [review_id]);
  return data.rows[0];
};

module.exports = {
    getReviewsByInventoryId,
    addReview,
    updateReview,
    deleteReview,
    getReviewById
};
