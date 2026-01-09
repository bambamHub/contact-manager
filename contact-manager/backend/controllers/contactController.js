import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, email, and phone are required" });
    }

    const contact = await Contact.create({ name, email, phone, message });

    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    await contact.deleteOne();
    return res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
