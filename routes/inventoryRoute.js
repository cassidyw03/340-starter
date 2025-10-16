// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildVehicleDetail))

// Intentional 500 error route!
router.get("/cause-error", invController.intentionalError)


module.exports = router

