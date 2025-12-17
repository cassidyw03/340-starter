const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
  *  Inventory Add Classification Data Validation Rules
  * ********************************* */
 validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty().withMessage("Classification name is required.")
      .isAlphanumeric().withMessage("Classification name must contain only letters and numbers, no spaces or special characters.")
  ]
}

 /*  **********************************
  *  Inventory Add Data Validation Rules
  * ********************************* */
 validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty().withMessage("Make is required."),
    body("inv_model")
      .trim()
      .notEmpty().withMessage("Model is required."),
    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: 9999 }).withMessage("Year must be a 4-digit number."),
    body("inv_description")
      .trim()
      .notEmpty().withMessage("Description is required."),
    body("inv_image")
      .trim()
      .notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail")
      .trim()
      .notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price")
      .trim()
      .isFloat({ min: 0 }).withMessage("Price must be a valid number."),
    body("inv_miles")
      .trim()
      .isInt({ min: 0 }).withMessage("Miles must be a valid number."),
    body("inv_color")
      .trim()
      .notEmpty().withMessage("Color is required."),
    body("classification_id")
      .notEmpty().withMessage("Classification is required.")
  ]
}

/* ******************************
 * Check Classification data and return errors or continue creating classification
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: errors.array(),
      locals: req.body
    })
    return
  }
  next()
}


/* ******************************
 * Check Inventory data and return errors or continue creating classification
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    res.render("./inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      classificationList,
      errors: errors.array(),
      locals: req.body
    })
    return
  }
  next()
}

/* ******************************
 * Check Update data and return errors 
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const {inv_id, classification_id} = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    res.render("./inventory/edit-inventory", {
      title: "Edit Inventory Item",
      nav,
      classificationList,
      errors: errors.array(),
      locals: req.body,
      inv_id
    })
    return
  }
  next()
}

module.exports = validate