"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var types = babel.types;
  var visitor = {
    BinaryExpression: function BinaryExpression(path) {
      var left = path.get('left');
      var right = path.get('right');

      if (right.isNumericLiteral() && right.node.value % 2 === 0) {
        if (path.node.operator === '*' || path.node.operator === '/') {
          var operators = {
            '*': '<<',
            '/': '>>'
          };
          var operator = operators[path.node.operator];
          var expr = types.binaryExpression(operator, left.node, types.NumericLiteral(Math.log2(right.node.value)));
          path.replaceWith(expr);
        }
      } else if (left.isNumericLiteral() && right.isNumericLiteral()) {
        var _operators = {
          '**': '*',
          '*': '+'
        };
        var weakerOperator = _operators[path.node.operator];

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