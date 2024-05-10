const path = require("path");
const express = require("express");
const rootDir = require("../helpers/path");
const shopController = require("../controllers/shop/products");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.list);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.getOrders);

module.exports = router;
