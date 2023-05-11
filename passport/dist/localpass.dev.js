"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = require("../models/user.js");

var _passportLocal = require("passport-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use('local-signup', new _passportLocal.LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function _callee(email, password, done) {
  var user, newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = _user.User.findOne({
            email: email
          });

          if (!user) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: "Ya existe ese email"
          }));

        case 3:
          newUser = new _user.User();
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
          _context.next = 8;
          return regeneratorRuntime.awrap(newUser.save());

        case 8:
          done(null, newUser);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}));

_passport["default"].use('local-signin', new _passportLocal.LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function _callee2(email, password, done) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", done(null, false, {
            message: "No user"
          }));

        case 5:
          if (comparePassword(password)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", done(null, false, {
            message: "Incorrect Password"
          }));

        case 7:
          done(null, user);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}));

module.exports = _passport["default"];