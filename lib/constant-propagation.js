"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(babel) {
  var visitor = {
    BlockStatement: function BlockStatement(path) {
      var varDecs = path.node.body.filter(function (node) {
        var _node$declarations;

        return !!((_node$declarations = node.declarations) === null || _node$declarations === void 0 ? void 0 : _node$declarations.find(function (d) {
          return d.init.type.endsWith('Literal');
        }));
      });
      var bindings = new Map();
      varDecs.forEach(function (varDec) {
        return varDec.declarations.forEach(function (d) {
          return bindings.set(d.id.name, d.init);
        });
      });
      path.traverse({
        BinaryExpression: function BinaryExpression(path) {
          var left = path.get('left');
          var right = path.get('right');
          var id;

          if (left.isIdentifier()) {
            id = left;
          } else if (right.isIdentifier()) {
            id = right;
          }

          if (!id) {
            return;
          }

          var lit = bindings.get(id.node.name);

          if (!lit) {
            return;
          }

          id.replaceWith(lit);
        }
      });
    }
  };
  return {
    name: 'constant-propagation',
    visitor: visitor
  };
};

exports["default"] = _default;