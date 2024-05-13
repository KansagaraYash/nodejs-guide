const path = require("path");
const fs = require("fs");
const rootDir = require("../helpers/path");
const Cart = require("./cart");

const filePath = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  return fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      let products = JSON.parse(fileContent);
      products = products.filter((prod) => prod.isDeleted == false);
      cb(products);
    }
  });
};

module.exports = class Product {
  constructor(id = null, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.isDeleted = false;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id == id);
      cb(product);
    });
  }

  updateProduct() {
    getProductsFromFile((products) => {
      const existingProductIndex = products.findIndex(
        (prod) => prod.id == this.id
      );
      const updatedProduct = [...products];
      updatedProduct[existingProductIndex] = this;

      fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const productIndex = products.findIndex((prod) => prod.id == id);
      const product = products[productIndex];
      product.isDeleted = true;

      const updatedProducts = [...products];
      updatedProducts[productIndex] = product;

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
