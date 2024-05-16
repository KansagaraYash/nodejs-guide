const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // isLoggedIn = req.get('cookie').split('=')[1];

  const isLoggedIn = req.session.isLoggedIn ?? false;

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.login = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'Age=23; HttpOnly');
  req.session.isLoggedIn = true;
  req.session.save((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
