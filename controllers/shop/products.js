const Product = require("../../models/product");
const Cart = require("../../models/cart");

exports.list = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      console.log(fields);
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id == product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      // console.log(cartProducts);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.deleteToCart = (req, res, next) => {
  const itemId = req.params.id;

  Product.findById(itemId, (product) => {
    Cart.deleteProduct(itemId, product.price);

    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/order", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findById(id).then(([rows, fields]) => {
    console.log(rows);
    let product = null;
    if(rows.length > 0 ){
      product = rows[0];
    }
    
    res.render("shop/product-detail", {
      product: product,
      pageTitle: rows[0].title,
      path: "/products",
    });
  }).catch((err) => {
    console.log(err);    
  });
};
