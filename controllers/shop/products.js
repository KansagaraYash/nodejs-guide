const Product = require("../../models/product");
const Cart = require("../../models/cart");

exports.list = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows, fields]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const isLoggedIn = req.session.isLoggedIn;

  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows, fields]) => {
  //     console.log(fields);
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const isLoggedIn = req.session.isLoggedIn;

  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  // Cart.fetchAll((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id == product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }

  //     // console.log(cartProducts);
  //     res.render("shop/cart", {
  //       pageTitle: "Your Cart",
  //       path: "/cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.addToCart = (req, res, next) => {
  const productId = req.params.id;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } }).then((products) => {
        let product;
        if (products.length > 0) {
          product = products[0];
        }

        let newQty = 1;
        if (product) {
          const oldQty = product.cartItem.quantity;
          newQty = oldQty + 1;
        }

        return Product.findByPk(productId).then((product) => {
          return cart.addProduct(product, {
            through: { quantity: newQty },
          });
        });
      });
    })
    .then(() => {
      res.redirect("/cart");
    });
};

exports.deleteToCart = (req, res, next) => {
  const productId = req.params.id;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } }).then((products) => {
        let product;
        if (products.length > 0) {
          product = products[0];
        }

        return product.cartItem.destroy();
      });
    })
    .then(() => {
      res.redirect("/cart");
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};