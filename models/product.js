const Cart = require("./cart");
const db = require("../helpers/database");

module.exports = class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)",
      [this.title, this.description, this.imageUrl, this.price]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  updateProduct() {}

  static deleteById(id) {}
};
