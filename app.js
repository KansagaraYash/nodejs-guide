// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

// const server = http.createServer(function(req, res){
//     // console.log(req.url, req.method, req.headers);
// })
const app = express();

// app.use((req, res, next) => {
//   console.log("In middleware");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).send('<h1 style="text-align:center">404 Page not found...!</h1>');
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// const server = http.createServer(app);
// server.listen(5000);

app.listen(3000);
