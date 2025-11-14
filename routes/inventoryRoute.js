// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildVehicleDetail))

// Route to build management view route
router.get("/", utilities.handleErrors(invController.buildManagementView))

router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// Route to build the add inventory page
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Route for add inventory form submission
// router.post("/add-inventory", utilities.handleErrors(invController.addInventory))


// Intentional 500 error route!
router.get("/cause-error", invController.intentionalError)


module.exports = router

