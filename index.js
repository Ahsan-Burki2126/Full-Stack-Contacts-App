import express from "express";
const app = express();
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const PORT = process.env.PORT;
// connect DB
connectDB();
// Homepage - show all contacts
app.use(ContactRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
