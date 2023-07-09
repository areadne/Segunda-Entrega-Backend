import { Router, query } from "express";
import "/Users/luis_/OneDrive/Documents/Areadne/Backend/Primera-pre-entrega/src/data/cart.json" assert { type: "json" };
import { ProductManager } from "../dao/file-manager/productManager.js";
import { MongoDBProductManager } from "../dao/mongo-manager/product.manager.js";
import { cartManagerDB } from "../dao/mongo-manager/cart.manager.js";

const router = Router();
const manager = new ProductManager(
  "/Users/luis_/OneDrive/Documents/Areadne/Backend/Primera-pre-entrega/src/data/cart.json"
);

const managerDB = new cartManagerDB();

router.post("/", async (request, response) => {
  managerDB.createCart(request, response);
});

router.get("/:cid", async (request, response) => {
  const id = Number(request.params.cid);
  response.send(await managerDB.getProductById(id, response));
});

router.post("/:cid/products/:pid", async (request, response) => {
  managerDB.addProductInCart(request, response);
});

router.delete("/:cid/products/:pid", async (request, response) => {
  await managerDB.deleteProduct(request, response);
});

router.delete("/:cid", async (request, response) => {
  await managerDB.deleteProducts(request, response);
});

router.put("/:cid/products/:pid", async (request, response) => {
  await managerDB.updateQty(request, response);
});

router.put("/:cid", async (request, response) => {
  await managerDB.updateAllCart(request, response);
});

router.get("/carts/:cid", async (request, response) => {
  const id = Number(request.params.cid);
  const result = await managerDB.getProductById(id, response);
  response.render("cart", result);
});

export default router;
