const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

let db = require('./database')
const { response } = require('express')

app.listen(port, () => {
    console.log(`Server running at: ${port}`)
})

// Provides the API status
app.get("/", (req, res) => {
    let response = JSON.stringify({ "Status": "API is working fine." })
    res.status(200).send(response)
})

// Get all users (Testing)
app.get('/users', (req, res) => {
    let getAllUsers = "SELECT * from User"
    let params = []
    db.all(getAllUsers, params, (err, userRows) => {
        let response = ""
        //! Error
        if (err) {
            response = JSON.stringify({ "Error:": err.name + "-> " + err.message })
        }
        else{
            response = JSON.stringify({ "Users": userRows })
        }

        res.send(response)
    })
})

// Create new user

// The body-parser middleware module, added to the Express.js app, 
// will try to parse the body content (URL encoded or JSON) of the post request 
// and store it in req.body object.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Signup
app.post("/signup/", (req, res) => {
    console.log(req.body)

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let repassword = req.body.repassword

    if (!name || !email || !password || !repassword) {
        console.log(name, email, password, repassword)
        res.status(404).json({ "Error": "One or more fields are missing" })
        return
    }

    if (password !== repassword) {
        let response = JSON.stringify({ "Error": "Password mismatch" })
        res.send(response)
        return
    }

    // This checks if user's email is already present in the database
    let getUserWithEmail = "SELECT * from User WHERE email = \"" + email + "\""
    console.log(getUserWithEmail)
    let params = []
    let result = false
    db.all(getUserWithEmail, params, (err, userRows) => {
        //! Error
        if (err) {
            console.log({ "Error:": err.name + "-> " + err.message })
            result = true
        }

        let len = Number(userRows.toString().length)
        if (Number(len) > 0) {
            console.log("User already exists", userRows, len)
            result = true
        }

        console.log("Result:", result)

        if (result) {
            let response = JSON.stringify({ "Error": "User with this email ID already exists" })
            res.send(response)
            return
        }

        let saveUserDetails = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)"
        let params = [name, email, password]
        db.all(saveUserDetails, params, (err, queryResult) => {
            //! Error
            let response = ""
            if (err) {
                console.log({ "Error:": err.name + "-> " + err.message })
                response = JSON.stringify({ "Error": "Signup unsuccessful" })
            }
            else {
                response = JSON.stringify({ "Success": "User created" })
            }
            res.send(response)
        })
    })
})



// Login
app.post("/login/", (req, res) => {
    console.log(req.body)

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        console.log(name, email, password)
        let response = JSON.stringify({ "Error": "One or more fields are missing" })
        res.status(404).send(response)
        return
    }

    // This fetches user's details from the data base
    let getUserWithEmail = "SELECT * from User WHERE email = \"" + email + "\""
    console.log(getUserWithEmail)
    let params = []
    let result = true
    db.all(getUserWithEmail, params, (err, userRows) => {
        //! Error
        if (err) {
            console.log({ "Error:": err.name + "-> " + err.message })
            result = false
        }

        let len = Number(userRows.toString().length)
        if (Number(len) == 0) {
            console.log("User does not exist", userRows, len)
            result = false
        }

        else if (userRows[0].email != email || userRows[0].password != password) {
            console.log("User details are incorrect, failed to login..", userRows, name, email, password)
            result = false
        }

        console.log("Result:", result)

        let response = ""
        if (!result) {
            response = JSON.stringify({ "Error": "User details are incorrect" })
        }
        else {
            response = JSON.stringify({ "Success": "User logged in" })
        }
        res.send(response)
    })
})

// For invalid requests, respond with 404
app.use((req, res) => {
    let response = JSON.stringify({"404": "Are you lost?"})
    res.status(404).send(response)
})

// lt --subdomain myauthapp --port 4000

