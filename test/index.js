import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

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

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

app.post("/api/profiles", createProfile);
app.put("/api/profiles/:id", updateProfile);
app.get("/api/profiles/:id", getProfile);
app.delete("/api/profiles/:id", deleteProfile);

app.post("/api/users", createUser);
app.post("/api/login", loginUser);
app.post("/api/logout", logoutUser);

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port 3000 ${port}`);
});
