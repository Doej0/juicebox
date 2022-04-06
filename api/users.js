const express = require("express");
const usersRouter = express.Router();

const { getAllUsers, getUserByUsername } = require("../db");

const jwt = require("jsonwebtoken");

//when a request comes in
//we first ask the database for the data we want
// then send it back to the user.
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      //create token & return to user
      const token = jwt.sign(
        {
          id: user.id,
          useranme: "albert",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
