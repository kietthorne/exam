const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/dataSchool", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

const authRouter = require("./routes/auth");
const profileRouter = require("./models/profile");

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port 3000 ${port}`);
});
