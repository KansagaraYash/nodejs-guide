const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");
const adminController = require("../controllers/admin/products");

const router = express.Router();

// /admin/products => GET
router.get("/list", adminController.getProducts);

// /admin/product-add => GET
router.get("/product-add", adminController.create);
// /admin/product-add => POST
router.post("/product-add", adminController.store);

router.get("/product-edit/:id", adminController.edit);
router.post("/product-update", adminController.update);

router.post("/product-delete", adminController.delete);

module.exports.router = router;
