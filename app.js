const express = require("express");
const app = express();
// const PORT = process.env.PORT || 5000;
const db = require("./db");
const { User, Department } = db.models;

// app.use("/api", require("./api"));
app.use(express.json());

app.get("/api/users", (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.post("/api/users", (req, res, next) => {
  User.create(req.body)
    .then(item => res.send(item))
    .catch(next);
});
app.delete("/api/users/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.put("/api/users/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.get("/api/departments", (req, res, next) => {
  Department.findAll()
    .then(departments => res.send(departments))
    .catch(next);
});

app.post("/api/departments", (req, res, next) => {
  User.create(req.body)
    .then(item => res.send(item))
    .catch(next);
});
app.delete("/api/departments/:id", (req, res, next) => {
  Department.findByPk(req.params.id)
    .then(department => department.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.put("/api/departments/:id", (req, res, next) => {
  Department.findByPk(req.params.id)
    .then(department => department.update(req.body))
    .then(department => res.send(department))
    .catch(next);
});

// app.get("/api/departments", async (req, res, next) => {
//     try {
//       await res.send(Department.findAll());
//     } catch (ex) {
//       next(ex);
//     }
//   });

// db.syncAndSeed().then(
//   app.listen(PORT, () => {
//     console.log(`listening port ${PORT}`);
//   })
// );

module.exports = app;
