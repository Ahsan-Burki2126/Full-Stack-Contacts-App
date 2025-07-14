const express = require("express");
const app = express();
const Contact = require("./models/contact.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Homepage - show all contacts
app.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.render("home", { contacts });
});

// View single contact
app.get("/view-contact/:id", async (req, res) => {
  const user = await Contact.findById(req.params.id);
  res.render("view-contact", { user });
});

// Edit contact (GET)
app.get("/edit-contact/:id", async (req, res) => {
  const user = await Contact.findById(req.params.id);
  res.render("edit-contact", { user });
});

// Edit contact (POST)
app.post("/edit-contact/:id", async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await Contact.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    email,
    address,
  });
  res.redirect("/");
});

// Add contact (GET)
app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

// Add contact (POST)
app.post("/add-contact", async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const newContact = new Contact({ firstName, lastName, email, address });
  await newContact.save();
  res.redirect("/");
});

// Delete contact
app.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("✅ App is listening on port 3000");
});
