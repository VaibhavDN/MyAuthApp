const sqlite3 = require('sqlite3').verbose()

const dbSource = 'db.sqlite'
let db = new sqlite3.Database(dbSource, (error) => {

    //! Connection error
    if (error) {
        console.log(error.name + ": " + error.message)
    }

    //* Connection successful
    else {
        console.log("Connection successful Yay!")

        // Try to create user table
        db.run(`CREATE TABLE User (id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL)`, (err) => {
            if(err) {
                //* Table User already exists
                console.log("Error: " + err.message)
            }
            else {
                //! Table just created
                // Adding some dummy rows
                let insertDummy = "INSERT INTO User(name, email, password) VALUES (?, ?, ?)"
                db.run(insertDummy, ["admin", "admin@admin.com", "admin@password"])
            }
        })
    }
})

module.exports = db
