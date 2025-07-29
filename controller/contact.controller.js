import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Contact.paginate({}, options);
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).render("500", { message: "Failed to load contacts." });
  }
};

// Get single contact for view
export const getContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .render("500", { message: "Invalid contact ID format." });
  }

  try {
    const user = await Contact.findById(id);
    if (!user) {
      return res.status(404).render("404", { message: "Contact not found." });
    }
    res.render("view-contact", { user });
  } catch (error) {
    console.error("Error retrieving contact:", error);
    res.status(500).render("500", { message: "Error retrieving contact." });
  }
};

// Get form to edit contact
export const getEditContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .render("500", { message: "Invalid contact ID format." });
  }

  try {
    const user = await Contact.findById(id);
    if (!user) {
      return res.status(404).render("404", { message: "Contact not found." });
    }
    res.render("edit-contact", { user });
  } catch (error) {
    console.error("Error loading edit form:", error);
    res
      .status(500)
      .render("500", { message: "Error loading contact for editing." });
  }
};

// Update contact (POST)
export const postEditContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .render("500", { message: "Invalid contact ID format." });
  }

  const { firstName, lastName, email, address } = req.body;

  try {
    await Contact.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      address,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).render("500", { message: "Failed to update contact." });
  }
};

// Get form to add new contact
export const getAddContact = (req, res) => {
  res.render("add-contact");
};

// Add new contact (POST)
export const postAddContact = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;

  try {
    const newContact = new Contact({ firstName, lastName, email, address });
    await newContact.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).render("500", { message: "Failed to add new contact." });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .render("500", { message: "Invalid contact ID format." });
  }

  try {
    await Contact.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).render("500", { message: "Failed to delete contact." });
  }
};
