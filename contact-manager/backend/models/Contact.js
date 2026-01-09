import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required"]
    },
    message: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false }
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
