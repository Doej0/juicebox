const express = require("express");
const usersRouter = express.Router();
const { getAllUsers } = require("../db");

//when a request comes in
//we first ask the database for the data we want
// then send it back to the user.
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

module.exports = usersRouter;
