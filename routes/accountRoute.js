// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build the registration
router.get("/registration", utilities.handleErrors(accountController.buildRegistration))

// Route to enable registration route
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router