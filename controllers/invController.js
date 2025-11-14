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

// invCont.buildAddInventory = async function (req, res, next) {
//   // console.log("/test");
//   const nav = await utilities.getNav()
//   res.render("./inventory/add-inventory", {
//     title: "Add New Inventory",
//     nav
  // })
// }

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




// /* ***************************
//  *  Build the add inventory view
//  * ************************** */
// invCont.buildAddInventory = async function (req, res, next) {
//     const nav = await utilities.getNav()
//     const classificationSelect = await utilities.buildClassificationList()
//     res.render("./inventory/add-inventory", {
//       title: "Add New Vehicle",
//       nav,
//       classificationSelect,
//       errors: null,
//       messages: req.flash("notice"),
//       // default empty values so the form is sticky
//       inv_make: "",
//       inv_model: "",
//       inv_year: "",
//       inv_description: "",
//       inv_image: "/images/vehicles/no-image.png",
//       inv_thumbnail: "/images/vehicles/no-image-tn.png",
//       inv_price: "",
//       inv_miles: "",
//       inv_color: "",
//       classification_id: ""
//     })
// }

/* ***************************
 *  Process Add Inventory submission
 * ************************** */
// invCont.addInventory = async function (req, res, next) {
//     const nav = await utilities.getNav()
//     const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

//     const addResult = await invModel.addInventoryItem(
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
//     )

//     if (addResult) {
//       req.flash("notice", `The ${inv_make} ${inv_model} was successfully added.`)
//       res.redirect("/inv/")
//     } else {
//       const classificationSelect = await utilities.buildClassificationList(classification_id)
//       req.flash("notice", "Sorry, the addition failed.")
//       res.status(501).render("inventory/add-inventory", {
//         title: "Add New Vehicle",
//         nav,
//         classificationSelect,
//         errors: null,
//         messages: req.flash("notice"),
//         inv_make,
//         inv_model,
//         inv_year,
//         inv_description,
//         inv_image,
//         inv_thumbnail,
//         inv_price,
//         inv_miles,
//         inv_color,
//         classification_id
//       })
//     }
// }





// Intentional Error
invCont.intentionalError = async function(req, res, next) {
  throw new Error("Intentional 500 error triggered!")
}

module.exports = invCont
