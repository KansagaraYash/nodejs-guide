const Product = require("../../models/product");
const http = require('https');
const path = require('path');
const fs = require('fs');

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


exports.pdf = function (req, response) {
  getPdf(req, response);
};

function getPdf (req, response) {
  var pdfUrl =
    "https://qkm-oxygene-live.s3.eu-central-1.amazonaws.com/Invoice/INV000019_receipt1265893332.pdf";

  http.get(pdfUrl, function (res) {
      var chunks = [];
      res.on("data", function (chunk) {
        console.log("start");
        chunks.push(chunk);
      });

      res.on("end", function () {
        console.log("downloaded");
        var base64String = new Buffer.concat(chunks).toString("base64");

        const pdfPath = path.join(path.dirname(process.mainModule.filename), 'data/pdf/', `test.pdf`);
        
        // Decode base64 string
        const base64Data = base64String.replace(/^data:application\/pdf;base64,/, '');
        const pdfBuffer = Buffer.from(base64Data, 'base64');

        // Write buffer to PDF file
        fs.writeFile(pdfPath, pdfBuffer, (err) => {
          if (err) {
            console.error('Error writing PDF file:', err);
            return res.status(500).send('Error writing PDF file');
          }

          response.send(`PDF file created successfully at ${pdfPath}`);
        });

        // console.log("converted to base64");
        // // response.header("Access-Control-Allow-Origin", "*");
        // response.header("Access-Control-Allow-Headers", "X-Requested-With");
        // response.header("content-type", "text/html");
        // response.header("Sec-Fetch-Dest", "document")
        // response.send(jsfile);
      });
    })
    .on("error", function () {
      console.log("error");
    });
}