"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var types = babel.types;
  return {
    visitor: {
      BinaryExpression: function BinaryExpression(path) {
        var _path$node = path.node,
            left = _path$node.left,
            operator = _path$node.operator,
            right = _path$node.right;

        if (left.type === 'StringLiteral' && right.type === 'StringLiteral' && operator === '+') {
          path.replaceWith(types.stringLiteral(left.value + right.value));
        } else if (left.type === 'NumericLiteral' && right.type === 'NumericLiteral' && operator === '+') {
          path.replaceWith(types.numericLiteral(left.value + right.value));
        }
      }
    }
  };
};

exports["default"] = _default;