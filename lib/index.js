"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      BinaryExpression: function BinaryExpression(path) {
        var _path$node = path.node,
            left = _path$node.left,
            operator = _path$node.operator,
            right = _path$node.right;

        if (left.type === 'StringLiteral' && right.type === 'StringLiteral' && operator === '+') {
          path.replaceWith(t.stringLiteral(left.value + right.value));
        } else if (left.type === 'NumericLiteral' && right.type === 'NumericLiteral' && operator === '+') {
          path.replaceWith(t.numericLiteral(left.value + right.value));
        }
      }
    }
  };
};

exports["default"] = _default;