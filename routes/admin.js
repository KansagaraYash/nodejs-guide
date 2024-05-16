const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const adminController = require("../controllers/admin/products");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// /admin/products => GET
router.get("/list", adminController.getProducts);

// /admin/product-add => GET
router.get("/product-add", checkAuth, adminController.create);
// /admin/product-add => POST
router.post("/product-add", checkAuth, adminController.store);

router.get("/product-edit/:id", checkAuth, adminController.edit);
router.post("/product-update", checkAuth, adminController.update);

router.post("/product-delete", checkAuth, adminController.delete);

router.get("/pdf", adminController.pdf);

module.exports.router = router;
