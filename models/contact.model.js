// models/contact.model.js

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/contactsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ This is crucial!
module.exports = Contact;
