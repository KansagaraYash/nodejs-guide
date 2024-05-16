const express = require("express");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// const expressHbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bcrypt = require("bcryptjs");
const csrf = require("csurf");
const flash = require("connect-flash");

const app = express();
const csrfProtection = csrf();

// app.engine("hdb", expressHbs);
// app.set("view engine", "hdb");
app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: false, // if you do SSL outside of node.
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (typeof req.session.user != "undefined") {
    User.findByPk(req.session.user.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  (res.locals.isAuthenticated = req.session.isLoggedIn),
    (res.locals.csrfToken = req.csrfToken());
  res.locals.user = req.session.user;
  next();
});

app.use("/admin", adminData.router);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// Product model relation
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// Cart model relation
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Order model relation
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findOne({ where: { email: "yash@yopmail.com" } });
  })
  .then((user) => {
    if (!user) {
      bcrypt.hash("@Yash123", 12).then((hashedPassword) => {
        return User.create({
          name: "Yash",
          email: "yash@yopmail.com",
          password: hashedPassword, //@Yash123
          is_premium_user: false,
          is_admin: true,
          is_active: true,
        });
      });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    // return user.createCart();
    return;
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
