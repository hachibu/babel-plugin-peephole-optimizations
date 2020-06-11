"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var visitor = {
    BinaryExpression: function BinaryExpression(path) {
      var left = path.get('left');
      var right = path.get('right');

      if (left.isNumericLiteral() && right.isNumericLiteral()) {
        var operators = {
          '**': '*',
          '*': '+'
        };
        var weakerOperator = operators[path.node.operator];

        if (weakerOperator) {
          var code = "".concat(left.node.value);

          for (var i = 0; i < right.node.value - 1; i++) {
            code += "".concat(weakerOperator, " ").concat(left.node.value);
          }

          path.replaceWith(babel.template.expression(code)());
          path.skip();
        }
      }
    }
  };
  return {
    name: 'strength-reduction',
    visitor: visitor
  };
};

exports["default"] = _default;