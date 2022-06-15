import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  alt_phone_number: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  // image: {
  //   data: Buffer,
  //   contentType: String,
  // },
});

const Contacts = mongoose.model("Contacts", contactSchema);
export { Contacts };
