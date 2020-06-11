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

      while (left.isBinaryExpression({
        operator: '+'
      })) {
        var leaf = getLeaf(left, left.key);

        if (leaf) {
          var typeCtor = babel.types[leaf.node.type];
          leaf.parentPath.replaceWith(typeCtor(leaf.parent.left.value + leaf.parent.right.value));
        }
      }

      if (left.isStringLiteral() && right.isStringLiteral() || left.isNumericLiteral() && right.isNumericLiteral()) {
        var _typeCtor = babel.types[left.node.type];
        path.replaceWith(_typeCtor(left.node.value + right.node.value));
      }
    }
  };

  var getLeaf = function getLeaf(path, key) {
    return path.isBinaryExpression() ? getLeaf(path.get(key), key) : path;
  };

  return {
    visitor: visitor
  };
};

exports["default"] = _default;