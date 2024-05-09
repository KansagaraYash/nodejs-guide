const path = require("path");
const express = require("express");
const rootDir = require("../helpers/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, 'views/shop','shop.pug'));
  res.render("shop/index", {prods: adminData.products, pageTitle: "My Shop", path:'/'});
});

module.exports = router;
