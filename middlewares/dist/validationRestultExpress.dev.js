"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationResultExpress = void 0;

var _expressValidator = require("express-validator");

var validationResultExpress = function validationResultExpress(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

exports.validationResultExpress = validationResultExpress;