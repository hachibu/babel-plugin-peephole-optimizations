"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var visitor = {
    BinaryExpression: function BinaryExpression(path) {
      if (!path.isBinaryExpression({
        operator: '+'
      })) {
        return;
      }

      var left = path.get('left');
      var right = path.get('right');

      if (left.isBinaryExpression({
        operator: '+'
      })) {
        var leaf = getLeaf(left, left.key);

        if (leaf) {
          var typeCtor = getTypeCtor(leaf.node.type);
          leaf.parentPath.replaceWith(typeCtor(leaf.parent.left.value + leaf.parent.right.value));
        }
      }

      if (left.isBinaryExpression({
        operator: '+'
      })) {
        var _leaf = getLeaf(left, left.key);

        if (_leaf) {
          var _typeCtor = getTypeCtor(_leaf.node.type);

          _leaf.parentPath.replaceWith(_typeCtor(_leaf.parent.left.value + _leaf.parent.right.value));
        }
      }

      if (left.isStringLiteral() && right.isStringLiteral() || left.isNumericLiteral() && right.isNumericLiteral()) {
        var _typeCtor2 = getTypeCtor(left.node.type);

        path.replaceWith(_typeCtor2(left.node.value + right.node.value));
      }
    }
  };

  function getLeaf(path, direction) {
    if (path.isNumericLiteral() || path.isStringLiteral()) {
      return path;
    } else if (path.isBinaryExpression({
      operator: '+'
    })) {
      return getLeaf(path.get(direction), direction);
    }
  }

  function getTypeCtor(type) {
    var typeCtor;

    if (type === 'StringLiteral') {
      typeCtor = babel.types.stringLiteral;
    } else if (type === 'NumericLiteral') {
      typeCtor = babel.types.numericLiteral;
    }

    return typeCtor;
  }

  return {
    visitor: visitor
  };
};

exports["default"] = _default;