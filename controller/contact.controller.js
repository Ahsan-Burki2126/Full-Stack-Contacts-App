import Contact from "../models/contact.model.js";

// Get all contacts
export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.render("home", { contacts });
};

// Get single contact for view
export const getContact = async (req, res) => {
  const user = await Contact.findById(req.params.id);
  res.render("view-contact", { user });
};

// Get form to edit contact
export const getEditContact = async (req, res) => {
  const user = await Contact.findById(req.params.id);
  res.render("edit-contact", { user });
};

// Update contact (POST)
export const postEditContact = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await Contact.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    email,
    address,
  });
  res.redirect("/");
};

// Get form to add new contact
export const getAddContact = (req, res) => {
  res.render("add-contact");
};

// Add new contact (POST)
export const postAddContact = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const newContact = new Contact({ firstName, lastName, email, address });
  await newContact.save();
  res.redirect("/");
};

// Delete contact
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
