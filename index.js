// implement your API here
const express = require("express");

const server = express();

const data = require("./data/db.js");

server.use(express.json());

// GET reqeuest for all users
server.get("/api/users", (req, res) => {
    data.find()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Error getting user information"
            })
        })
})

//GET request for a single user
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    data.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "An error has occured while trying to get user information."
            })
        })
})

//POST request
server.post("/api/users", (req, res) => {
    const body = req.body;

    data.insert(body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(err => {
                res.status(500).json({
                    errorMessage: "Error adding user to the database"
                });
        })
})

//DELETE request
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    data.remove(id)
        .then(user => {
            res.status(204).json(user)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "An error has occured trying to delete a user"
            })
        })
})

//PUT request
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    data.update(id, body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "An error has occured while attempting to update a user."
            })
        })
})

const port = 8000;
server.listen(port, () => {
    console.log(`\n ** Server running on port:${port} **\n`);
})