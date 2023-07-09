import express from "express";
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import mongoose, { mongo } from "mongoose";
import handlebars from "express-handlebars";
import viewRouter from "./routers/view.router.js";

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

app.use("/products", viewRouter);

await mongoose.connect(
  "mongodb+srv://coder:coder@cluster0.ywdnzff.mongodb.net/ecommerce"
);

const httpServer = app.listen(8080, () => {
  console.log("estoy en ejecucion");
});