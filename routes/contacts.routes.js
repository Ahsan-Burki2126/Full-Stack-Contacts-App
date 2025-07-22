import express from "express";
import {
  getContacts,
  getContact,
  getEditContact,
  postEditContact,
  getAddContact,
  postAddContact,
  deleteContact,
} from "../controller/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/view-contact/:id", getContact);
router.get("/edit-contact/:id", getEditContact);
router.post("/edit-contact/:id", postEditContact);
router.get("/add-contact", getAddContact);
router.post("/add-contact", postAddContact);
router.get("/delete-contact/:id", deleteContact);

export default router;
