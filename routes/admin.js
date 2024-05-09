const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");

const router = express.Router();

const products = [];

// /admin/product-add => GET
router.get("/product-add", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views/admin/product", "create.html"));
  res.render("admin/product/create", {pageTitle: "Create Product", path: "admin/product-add"});
});

// /admin/product-add => POST
router.post("/product-add", (req, res, next) => {
  products.push({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });
});

console.log(products);

module.exports.router = router;
module.exports.products = products;
