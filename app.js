const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db");
const { User, Department } = db.models;

// app.use("/api", require("./api"));

app.get("/api/users", async (req, res, next) => {
  try {
    await res.send(User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/departments", async (req, res, next) => {
    try {
      await res.send(Department.findAll());
    } catch (ex) {
      next(ex);
    }
  });

db.syncAndSeed().then(
  app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  })
);
