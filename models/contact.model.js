import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
});

contactSchema.plugin(mongoosePaginate);
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
