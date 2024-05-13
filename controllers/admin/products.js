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
  product
    .save()
    .then(() => {
      // console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
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

exports.edit = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/product/edit", {
      pageTitle: "Edit Product",
      path: "admin/product-edit",
      product: product,
    });
  });
};

exports.update = (req, res, next) => {
  const productId = req.body.productId;
  const productTitle = req.body.title;
  const productPrice = req.body.price;
  const productDescription = req.body.description;
  const productImageUrl = req.body.imageUrl;

  const updatedProduct = new Product(
    productId,
    productTitle,
    productDescription,
    productImageUrl,
    productPrice
  );
  updatedProduct.updateProduct();

  res.redirect("/admin/list");
};

exports.delete = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId);

  res.redirect("/admin/list");
};
