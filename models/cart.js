const path = require("path");
const fs = require("fs");
const rootDir = require("../helpers/path");

const filePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart data
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      // const existingProductIndex = cart.product.findIndex(prod => prod.id == id);
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id == id
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + parseFloat(productPrice);

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updateCart = { ...JSON.parse(fileContent) };

      updateCart.totalPrice = 0;
      if (updateCart.products.length) {
        const product = updateCart.products.find((prod) => prod.id == id);
        const productQty = product.qty;

        updateCart.products = updateCart.products.filter(
          (prod) => prod.id !== id
        );

        updateCart.totalPrice =
          updateCart.totalPrice - productPrice * productQty;
      }

      fs.writeFile(filePath, JSON.stringify(updateCart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
