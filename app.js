const express = require("express");
const app = express();
// const PORT = process.env.PORT || 5000;
const db = require("./db");
const { User, Department } = db.models;

// app.use("/api", require("./api"));
app.use(express.json())

app.get("/api/users", (req,res,next) =>{
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

app.post('/api/users', (req,res,next)=>{
  User.create(req.body)
    .then(item => res.send(item))
    .catch(next)
})

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