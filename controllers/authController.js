const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // isLoggedIn = req.get('cookie').split('=')[1];

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: req.flash(),
  });
};

exports.login = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'Age=23; HttpOnly');
  const { password, email } = req.body;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    return bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect("/");
        });
      }

      req.flash("error", "Invalid email or password");
      res.redirect("/login");
    });
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    errorMessage: req.flash(),
  });
};

exports.signup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ where: { email: email } })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email is already exists,so try with other email.!");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          return User.create({
            email: email,
            password: hashedPassword,
          }).then((user) => {
            return user.createCart();
          });
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
