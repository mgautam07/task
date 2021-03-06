import { Router } from "express";
import { Contacts } from "../Contact.js";
import multer from "multer";
import path from "path";

const cont = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

cont.post("/create", upload.single("image"), async (req, res, next) => {
  const img_name = req.file ? req.file.filename : "";
  const newContact = new Contacts({
    name: req.body.iname,
    phone_number: req.body.phone_number,
    alt_phone_number: req.body.alt_phone_number,
    email: req.body.email,
    image: img_name,
  });
  const result = await newContact.save();
  console.log(result);
  res.send("new contact added");
});

cont.get("/showall", async (req, res) => {
  const all_contacts = await Contacts.find({});
  res.send(all_contacts);
});

cont.delete("/delete", async (req, res) => {
  const result = await Contacts.deleteOne({ name: req.body.name });
  console.log(result);
  result.deletedCount !== 0
    ? res.send("contact deleted")
    : res.send("No contact deleted");
});

cont.put("/update", async (req, res) => {
  const new_name = req.body.name;
  const new_phone_number = req.body.phone_number;
  const new_alt_phone_number = req.body.alt_phone_number;
  const new_email = req.body.email;
  const new_image = req.body.image;

  const result = await Contacts.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name: new_name,
        phone_number: new_phone_number,
        alt_phone_number: new_alt_phone_number,
        email: new_email,
        image: new_image,
      },
    }
  );
  console.log(result);
  result ? res.send("Contact updated") : res.send("Contact not updated");
});

cont.get("/search", async (req, res) => {
  const name_results = await Contacts.find({
    name: { $regex: req.body.query },
  });
  name_results ? res.send(name_results) : res.send("No search results");
});

export default cont;
