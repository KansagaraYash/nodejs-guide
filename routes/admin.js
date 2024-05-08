const express = require("express");
const path = require('path');
const rootDir = require('../helpers/path');

const router = express.Router();

// /admin/product-add => GET
router.get("/product-add", (req, res, next) => {
//   res.send(
//     '<form action="/admin/product-add" method="POST"><input type="text" name="title"><button type="submit">Add</button></form>'
//   );

    res.sendFile(path.join(rootDir, 'views/admin/product','create.html'));
});

// /admin/product-add => POST
router.post("/product-add", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
