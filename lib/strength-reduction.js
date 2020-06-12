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

      if (!right.isNumericLiteral()) {
        return;
      }

      if (right.node.value % 2 === 0) {
        var operators = {
          '*': '<<',
          '/': '>>'
        };
        var operator = operators[path.node.operator];

        if (!operator) {
          return;
        }

        var expr = types.binaryExpression(operator, left.node, types.NumericLiteral(Math.log2(right.node.value)));
        path.replaceWith(expr);
      } else {
        var _operators = {
          '**': '*',
          '*': '+'
        };
        var _operator = _operators[path.node.operator];

        if (!_operator) {
          return;
        }

        var _expr;

        for (var i = 0; i < right.node.value; i++) {
          var subExpr = types.binaryExpression(_operator, left.node, left.node);

          if (!_expr) {
            _expr = subExpr;
          } else {
            _expr.right = subExpr;
          }
        }

        path.replaceWith(_expr);
        path.skip();
      }
    }
  };
  return {
    name: 'strength-reduction',
    visitor: visitor
  };
};

exports["default"] = _default;