const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory by vehicle detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getVehicleById(inv_id)
  const vehicleHTML = utilities.buildVehicleDetail(vehicle)
  const nav = await utilities.getNav()

  const title = vehicle ? `${vehicle.inv_make} ${vehicle.inv_model}` : "Vehicle Not Found"
  res.render("./inventory/detail",  {
    title, nav, vehicleHTML
  })
}

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  const nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav
  })
} 

/* ***************************
 *  Build the add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  const nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav
  })
}

// /* ***************************
//  *  Build the add inventory view
//  * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  // console.log("/test");
    const nav = await utilities.getNav()
    // const classificationSelect = await utilities.buildClassificationList()
    res.render("./inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav
      // classificationSelect
    })
}

// Intentional Error
invCont.intentionalError = async function(req, res, next) {
  throw new Error("Intentional 500 error triggered!")
}

module.exports = invCont
