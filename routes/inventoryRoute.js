// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidation = require("../utilities/inventory-validation")


// Route to build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildVehicleDetail))

// Route to build management view route
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Route to build the classification page
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// Route for add classification form submission
router.post("/add-classification", 
    invValidation.classificationRules(), 
    invValidation.checkClassificationData, 
    utilities.handleErrors(invController.addClassification))

// Route to build the add inventory page
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Route for add inventory form submission
router.post("/add-inventory", 
    invValidation.inventoryRules(),
    invValidation.checkInventoryData,
    utilities.handleErrors(invController.addInventory))

// Route for select inventory items (getInventory) for URL in inventory.js
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to deliver the edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEditInventory))

// ROute to devlier update inventory view
router.post("/update/", 
    invValidation.inventoryRules,
    invValidation.checkUpdateData,
    utilities.handleErrors(invController.updateInventory))


// Intentional 500 error route!
router.get("/cause-error", invController.intentionalError)


module.exports = router

