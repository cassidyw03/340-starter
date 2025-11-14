const pool = require("../database/")

/* *************************************************
 *  Get all classification data
 * ************************************************* */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* *************************************************
 *  Get all inventory items and classification_name by classification_id
 * ************************************************* */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error: " + error)
    throw error
  }
}

/* *************************************************
 *  Get a single vehicle by inventory id
 * ************************************************* */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    console.log("getVehicleById result:", data.rows[0])
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error: " + error)
    throw error
  }
}

// Data written to the inventory table within the database using a model-based function
// async function addInventoryItem(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
//     const sql = `
//       INSERT INTO public.inventory (
//         inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
//         inv_price, inv_miles, inv_color, classification_id
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//       RETURNING *`
//     const data = await pool.query(sql, [
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color,
//       classification_id
//     ])
//     return data.rows[0]
// }

module.exports = {getClassifications, getInventoryByClassificationId, getVehicleById};


