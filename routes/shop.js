const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const shopController = require("../controllers/shop/products");
const orderController = require("../controllers/shop/orders");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.list);

router.get("/cart", shopController.getCart);
router.get('/add-to-cart/:id', shopController.addToCart);
router.get('/delete-to-cart/:id', shopController.deleteToCart);

router.get("/checkout", shopController.getCheckout);

router.get("/product/:id", shopController.getProduct);

router.get('/create-order', orderController.createOrder);
router.get('/orders', orderController.getOrder);

module.exports = router;
