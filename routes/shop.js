const path = require("path");
const express = require("express");
const rootDir = require("../helpers/path");
const shopController = require("../controllers/shop/products");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.list);

router.get("/cart", shopController.getCart);
router.get('/add-to-cart/:id', shopController.addToCart);
router.get('/delete-to-cart/:id', shopController.deleteToCart);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.getOrders);

router.get("/product/:id", shopController.getProduct);

module.exports = router;
