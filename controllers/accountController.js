const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    notice: req.flash("notice"),
    errors: null
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegistration(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/registration", {
    title: "Registration",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
// async function registerAccount(req, res) {
//   let nav = await utilities.getNav()
//   const { account_firstname, account_lastname, account_email, account_password } = req.body

//   const regResult = await accountModel.registerAccount(
//     account_firstname,
//     account_lastname,
//     account_email,
//     account_password
//   )

//   if (regResult) {
//     req.flash(
//       "notice",
//       `Congratulations, you\'re registered ${account_firstname}! Please log in.`)
//       console.log("registerAccount: regResult true - redirecting to /account/login")
//     // res.status(201).redirect("account/login")
//     return res.redirect("/account/login")
  
//     // res.status(201).redirect("account/login", {
//     //   title: "Registration Successful",
//     //   nav,
//     //   message: `Welcome, ${account_firstname}! Your account `,
//     //   notice: req.flash("notice")
//     // })
//   } else {
//     req.flash("notice", "Sorry, the registration failed.")
//     res.status(501).render("account/registration", {
//       title: "Registration",
//       nav,
//       notice: req.flash("notice"),
//       errors: null
//     })
//   }
// }

// With try catch and error handling
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  try {
    // Hash password before storing in DB
    const hashedPassword = await bcrypt.hash(account_password, 10)

    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )

    if (regResult) {
      req.flash("notice", `Congratulations, you're registered ${account_firstname}! Please log in.`)
      console.log("registerAccount: regResult true - redirecting to /account/login")
      return res.redirect("/account/login")
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      return res.status(501).render("account/registration", {
        title: "Registration",
        nav,
        notice: req.flash("notice"),
        errors: null
      })
    }
  } catch (error) {
    console.error("Error during registration:", error)
    return res.status(500).render("errors/500", { title: "Server Error", nav })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
// /* ****************************************
//  *  Process login request
//  * ************************************ */
// async function accountLogin(req, res, next) {
//   let nav = await utilities.getNav()
//   const { account_email, account_password } = req.body

//   console.log("=== Login Attempt ===")
//   console.log("Email entered:", account_email)

//   try {
//     const accountData = await accountModel.getAccountByEmail(account_email)
//     if (!accountData) {
//       console.log("Login failed: account not found")
//       req.flash("notice", "Please check your credentials and try again.")
//       return res.status(400).render("account/login", {
//         title: "Login",
//         nav,
//         errors: null,
//         account_email,
//       })
//     }

//     console.log("Account found in DB:", accountData)

//     // Compare password
//     console.log("Comparing entered password with hashed password...")
//     const passwordMatch = await bcrypt.compare(account_password, accountData.account_password)

//     if (!passwordMatch) {
//       console.log("Login failed: password does not match")
//       req.flash("notice", "Please check your credentials and try again.")
//       return res.status(400).render("account/login", {
//         title: "Login",
//         nav,
//         errors: null,
//         account_email,
//       })
//     }

//     console.log("Password matched! Creating JWT...")

//     // Remove password before signing JWT
//     delete accountData.account_password

//     // JWT expires in 1 hour (3600000 ms)
//     const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })

//     console.log("JWT created:", accessToken)

//     // Set cookie
//     if (process.env.NODE_ENV === "development") {
//       res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
//     } else {
//       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
//     }

//     console.log("Cookie set, redirecting to /account/")
//     return res.redirect("/account/")
//   } catch (error) {
//     console.error("Error during login process:", error)
//     next(error)
//   }
// }

async function accountLogin(req, res, next) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body

  console.log("=== Login Attempt ===")
  console.log("Email entered:", account_email)

  try {
    const accountData = await accountModel.getAccountByEmail(account_email)

    if (!accountData) {
      console.log("Login failed: account not found")
      req.flash("notice", "Please check your credentials and try again.")
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email
      })
    }

    console.log("Account found in DB:", accountData)

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(account_password, accountData.account_password)

    if (!passwordMatch) {
      console.log("Login failed: password does not match")
      req.flash("notice", "Please check your credentials and try again.")
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email
      })
    }

    console.log("Password matched! Creating JWT...")
    delete accountData.account_password

    const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    console.log("JWT created:", accessToken)

    const cookieOptions = { httpOnly: true, maxAge: 3600 * 1000 }
    if (process.env.NODE_ENV !== "development") cookieOptions.secure = true
    res.cookie("jwt", accessToken, cookieOptions)

    console.log("Cookie set, redirecting to /account/")
    return res.redirect("/account/")
  } catch (error) {
    console.error("Error during login process:", error)
    next(error)
  }
}


// async function accountLogin(req, res, next) {
//   let nav = await utilities.getNav()
//   const { account_email, account_password } = req.body
//   const accountData = await accountModel.getAccountByEmail(account_email)
//   if (!accountData) {
//     req.flash("notice", "Please check your credentials and try again.")
//     res.status(400).render("account/login", {
//       title: "Login",
//       nav,
//       errors: null,
//       account_email,
//     })
//     return
//   }
//   try {
//     if (await bcrypt.compare(account_password, accountData.account_password)) {
//       delete accountData.account_password
//       const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
//       if(process.env.NODE_ENV === 'development') {
//         res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
//       } else {
//         res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
//       }
//       return res.redirect("/account/")
//     }
//     else {
//       req.flash("notice", "Please check your credentials and try again.")
//       res.status(400).render("account/login", {
//         title: "Login",
//         nav,
//         errors: null,
//         account_email,
//       })
//     }
//   } catch (error) {
//     next(error)
// }
// }

/* ****************************************
 *  Deliver Account Management View
 * ************************************ */
// async function buildAccountManagement(req, res, next) {
//     let nav = await utilities.getNav()
//     res.render("account/management", {
//       title: "Account Management",
//       nav,
//       errors: null
//     })
// }

// With a try catch
// async function buildAccountManagement(req, res, next) {
//   try {
//     let nav = await utilities.getNav()
//     res.render("account/management", { title: "Account Management", nav, errors: null })
//   } catch (err) {
//     console.log("ERROR in buildAccountManagement:", err)
//     res.status(500).send("Server error")
//   }
// }

/* ****************************************
 *  Deliver Account Management View
 * ************************************ */
// async function buildAccountManagement(req, res, next) {
//   let nav
//   try {
//     nav = await utilities.getNav()
//   } catch (error) {
//     console.error("Error getting navigation:", error)
//     return next(error)
//   }

//   try {
//     // Render the management page
//     res.render("account/management", {
//       title: "Account Management",
//       nav,
//       messages: req.flash("notice") || [],
//       errors: null
//     })
//   } catch (error) {
//     console.error("Error rendering account management page:", error)
//     return next(error)
//   }
// }

async function buildAccountManagement(req, res, next) {
  let nav
  try {
    nav = await utilities.getNav()
  } catch (error) {
    console.error("Error getting navigation:", error)
    return next(error)
  }

  try {
    res.render("account/management", {
      title: "Account Management",
      nav,
      messages: req.flash("notice") || [],
      errors: null
    })
  } catch (error) {
    console.error("Error rendering account management page:", error)
    return next(error)
  }
}


module.exports = { buildLogin, buildRegistration, registerAccount, accountLogin, buildAccountManagement}