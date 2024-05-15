const Product = require("../../models/product");

exports.create = (req, res, next) => {
  res.render("admin/product/create", {
    pageTitle: "Create Product",
    path: "admin/product-add",
  });
};

exports.store = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/list");
    })
    .catch((err) => {
      console.log(err);
    });

  //? First Way to create a new product
  // Product.create({
  //   title: title,
  //   price: price,
  //   description: description,
  //   imageUrl: imageUrl,
  //   userId: req.user.id,
  // })
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/admin/list");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/product/list", {
        prods: products,
        pageTitle: "Admin Products",
        path: "admin/list",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //? First Way to get all products
  // Product.findAll()
  //   .then((products) => {
  //     res.render("admin/product/list", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       path: "admin/list",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.edit = (req, res, next) => {
  const productId = req.params.id;

  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/product/edit", {
        pageTitle: "Edit Product",
        path: "admin/product-edit",
        product: product,
      });
    })
    .catch((err) => {});

  //? First Way to edit a product
  // Product.findByPk(productId)
  //   .then((product) => {
  //     if (!product) {
  //       return res.redirect("/");
  //     }
  //     res.render("admin/product/edit", {
  //       pageTitle: "Edit Product",
  //       path: "admin/product-edit",
  //       product: product,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.update = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      const product = products[0];
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("Product Updated...");
      res.redirect("/admin/list");
    })
    .catch((err) => {
      console.log(err);
    });

  //? First Way to update a product
  // Product.findByPk(id)
  //   .then((product) => {
  //     product.title = title;
  //     product.price = price;
  //     product.description = description;
  //     product.imageUrl = imageUrl;
  //     return product.save();
  //   })
  //   .then((result) => {
  //     console.log("Product Updated...");
  //     res.redirect("/admin/list");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const updatedProduct = new Product(
  //   productId,
  //   productTitle,
  //   productDescription,
  //   productImageUrl,
  //   productPrice
  // );
  // updatedProduct.updateProduct();
};

exports.delete = (req, res, next) => {
  const productId = req.body.productId;

  Product.destroy({ where: { id: productId } })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/list");
    })
    .catch((err) => {
      console.log(err);
    });
};
