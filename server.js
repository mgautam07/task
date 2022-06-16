import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Contacts } from "./Contact.js";
import cont from "./routes/contactRoutes.js";

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/contact", cont);
app.set("view engine", "ejs");
app.use(express.static("./uploads"));
app.get("/", (req, res) => {
  res.redirect("/contact/showall");
});

app.get("/create", (req, res) => {
  res.render("home");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGODB\n");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
