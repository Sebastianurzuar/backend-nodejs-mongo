"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homePage = exports.loginPage = exports.registerPage = exports.cerrarSesion = exports.login = exports.register = void 0;

var _user = require("../models/user.js");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 9;
            break;
          }

          throw new Error('Ya existe este email');

        case 9:
          user = new _user.User({
            email: email,
            password: password
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.json(user);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          res.json({
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          throw new Error('No existe este email');

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 9:
          if (_context2.sent) {
            _context2.next = 11;
            break;
          }

          throw new Error('Contraseña no correcta');

        case 11:
          req.login(user, function (err) {
            if (err) throw new Error('Error al crear la sesión');
            res.redirect('/home');
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          res.json({
            error: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

exports.login = login;

var cerrarSesion = function cerrarSesion(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/login');
  });
};

exports.cerrarSesion = cerrarSesion;

var registerPage = function registerPage(req, res) {
  res.render("createaccount");
};

exports.registerPage = registerPage;

var loginPage = function loginPage(req, res) {
  res.render("login");
};

exports.loginPage = loginPage;

var homePage = function homePage(req, res) {
  return regeneratorRuntime.async(function homePage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.render("home", {
              e: req.user
            });
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.homePage = homePage;