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
  const message = req.flash("notice")
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav, 
    message
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

/* ***************************
 *  Process add classification
 * ************************** */
// invCont.addClassification = async function (req, res, next) {
//   const { classification_name } = req.body

//   try {
//     const newClass = await invModel.addClassification(classification_name)

//     if (newClass) {
//       const nav = await utilities.getNav()

//       req.flash("notice", `Success! The ${classification_name} classification was added.`)

//       return res.redirect("/inv/")
//     } else {
//       const nav = await utilities.getNav()
//       return res.status(400).render("./inventory/add-classification", {
//         title: "Add New Classification",
//         nav,
//         message: "Sorry, the classification could not be added.",
//         classification_name
//       })
//     }
//   } catch (error) {
//     console.error("addClassification controller error:", error)
//     const nav = await utilities.getNav()
//     return res.status(500).render("./inventory/add-classification", {
//       title: "Add New Classification",
//       nav,
//       message: "An error occurred while adding the classification.",
//       classification_name
//     })
//   }
// }
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body

  try {
    const newClass = await invModel.addClassification(classification_name)

    if (newClass) {
      req.flash(
        "notice",
        `Success! The ${classification_name} classification was added.`
      )
      return res.redirect("/inv/")
    }

    // If insert failed but did not throw an error:
    req.flash("notice", "Sorry, the classification could not be added.")
    return res.redirect("/inv/add-classification")
  } catch (error) {
    console.error("addClassification controller error:", error)

    req.flash(
      "notice",
      "An unexpected error occurred while adding the classification."
    )
    return res.redirect("/inv/add-classification")
  }
}


invCont.buildAddInventory = async function (req, res, next) {
  let classificationList = await utilities.buildClassificationList()
  const nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationList
  })
}


/* ***************************
 *  Process add inventory
 * ************************** */
// invCont.addInventory = async function (req, res, next) {
//   let {
//     classification_id,
//     inv_make,
//     inv_model,
//     inv_year,
//     inv_description,
//     inv_image,
//     inv_thumbnail,
//     inv_price,
//     inv_miles,
//     inv_color
//   } = req.body

//   try {
//     // Call model function to insert inventory
//     const result = await invModel.addInventory(
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

//     if (result) {
//       req.flash(
//         "notice",
//         `Success! The ${inv_make} ${inv_model} was added to inventory.`
//       )
//       return res.redirect("/inv/")
//     }

//     // If insertion failed but no exception
//     req.flash("notice", "Sorry, the inventory item could not be added.")
//     const nav = await utilities.getNav()
//     const classificationList = await utilities.buildClassificationList()

//     return res.render("./inventory/add-inventory", {
//       title: "Add New Inventory Item",
//       nav,
//       classificationList,
//       classification_id,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color
//     })
//   } catch (error) {
//     console.error("addInventory controller error:", error)

//     req.flash(
//       "notice",
//       "An error occurred while adding the inventory item. Please check your inputs."
//     )

//     const nav = await utilities.getNav()
//     const classificationList = await utilities.buildClassificationList()

//     return res.status(500).render("./inventory/add-inventory", {
//       title: "Add New Inventory Item",
//       nav,
//       classificationList,
//       classification_id,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color
//     })
//   }
// }
invCont.addInventory = async function (req, res, next) {
  let {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body

  try {
    const result = await invModel.addInventory(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )

    if (result) {
      req.flash(
        "notice",
        `Success! The ${inv_make} ${inv_model} was added to inventory.`
      )
      return res.redirect("/inv/")
    }

    // Insertion failed but didn't throw
    req.flash("notice", "Sorry, the inventory item could not be added.")
    return res.redirect("/inv/add-inventory")
  } catch (error) {
    console.error("addInventory controller error:", error)

    req.flash(
      "notice",
      "An unexpected error occurred while adding the inventory item."
    )
    return res.redirect("/inv/add-inventory")
  }
}


// Intentional Error
invCont.intentionalError = async function(req, res, next) {
  throw new Error("Intentional 500 error triggered!")
}

module.exports = invCont
