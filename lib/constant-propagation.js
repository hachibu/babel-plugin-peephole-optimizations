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

        return !!((_node$declarations = node.declarations) === null || _node$declarations === void 0 ? void 0 : _node$declarations.find(function (dec) {
          return dec.init.type.endsWith('Literal');
        }));
      }); // 1. Find var declarations with a literal init.
      // 2. Traverse sub-expressions and expand references to var declarations.

      console.log(varDecs);
      path.skip();
    }
  };
  return {
    name: 'constant-propagation',
    visitor: visitor
  };
};

exports["default"] = _default;