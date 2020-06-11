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
        if (path.node.operator === '*') {
          var template = "".concat(left.node.value);

          for (var i = 0; i < right.node.value - 1; i++) {
            template += " + ".concat(left.node.value);
          }

          var ast = babel.template.expression(template)();
          path.replaceWith(ast);
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