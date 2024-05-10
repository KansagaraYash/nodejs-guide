const Product = require("../../models/product");

exports.create = (req, res, next) => {
  res.render("admin/product/create", {
    pageTitle: "Create Product",
    path: "admin/product-add",
  });
};

exports.store = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.description,
    req.body.imageUrl,
    req.body.price
  );
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product/list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "admin/list",
    });
  });
};
