import express from "express";


import authorsRoutes from "./routes/authorsRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

const app = express();
app.use(express.json());

app.use("/authors", authorsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/books", booksRoutes);
// app.use("/users", usersRoutes);
// app.use("/borrow", borrowRoutes);

app.listen(7777, () => {
  console.log("local host : 7777");
});
