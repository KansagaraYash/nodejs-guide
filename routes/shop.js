const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const shopController = require("../controllers/shop/products");
const orderController = require("../controllers/shop/orders");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.list);

router.get("/cart", checkAuth, shopController.getCart);
router.get("/add-to-cart/:id", checkAuth, shopController.addToCart);
router.get("/delete-to-cart/:id", checkAuth, shopController.deleteToCart);

router.get("/checkout", checkAuth, shopController.getCheckout);

router.get("/product/:id", shopController.getProduct);

router.get("/create-order", checkAuth, orderController.createOrder);
router.get("/orders", checkAuth, orderController.getOrder);

module.exports = router;
