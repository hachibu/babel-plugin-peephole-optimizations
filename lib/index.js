"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var types = babel.types;
  var visitor = {
    BinaryExpression: function BinaryExpression(path) {
      if (!path.isBinaryExpression({
        operator: '+'
      })) {
        return;
      }

      var left = path.get('left');
      var right = path.get('right');

      if (left.isBinaryExpression()) {
        left.traverse(visitor);
      } else if (left.isStringLiteral() && right.isStringLiteral()) {
        path.replaceWith(types.stringLiteral(left.node.value + right.node.value));
      } else if (left.isNumericLiteral() && right.isNumericLiteral()) {
        path.replaceWith(types.numericLiteral(left.node.value + right.node.value));
      }
    }
  };
  return {
    visitor: visitor
  };
};

exports["default"] = _default;