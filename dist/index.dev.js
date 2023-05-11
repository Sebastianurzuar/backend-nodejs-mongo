"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

require("./database/connectdb.js");

var _authRoute = _interopRequireDefault(require("./routes/auth.route.js"));

var _ejs = _interopRequireDefault(require("ejs"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _user = require("./models/user.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(_express["default"].json());
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressSession["default"])({
  secret: 'misecreto',
  resave: true,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _expressFlash["default"])());

_passport["default"].serializeUser(function (user, done) {
  done(null, user.email);
});

_passport["default"].deserializeUser(function _callee(email, done) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }));

        case 2:
          user = _context.sent;
          return _context.abrupt("return", done(null, user));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

app.use("/", _authRoute["default"]);
var puerto = process.env.PUERTO || 5000;
app.listen(puerto, function () {
  console.log("Aplicaci\xF3n corriendo en el puerto ".concat(puerto));
});