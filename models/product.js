const path = require("path");
const fs = require("fs");
const rootDir = require("../helpers/path");

const filePath = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  return fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
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
};
