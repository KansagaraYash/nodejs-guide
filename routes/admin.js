const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");
const adminController = require('../controllers/admin/products');

const router = express.Router();

const products = [];

// /admin/product-add => GET
router.get("/product-add", adminController.create);

// /admin/products => GET
router.get("/list", adminController.getProducts);

// /admin/product-add => POST
router.post("/product-add", adminController.store);

module.exports.router = router;
