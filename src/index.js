export default babel => {
  let { types } = babel;

  let visitor = {
    BinaryExpression(path) {
      if (!path.isBinaryExpression({ operator: '+' })) {
        return;
      }

      let left = path.get('left');
      let right = path.get('right');

      if (left.isBinaryExpression()) {
        left.traverse(visitor);
      }
      else if (left.isStringLiteral() && right.isStringLiteral()) {
        path.replaceWith(types.stringLiteral(left.node.value + right.node.value));
      }
      else if (left.isNumericLiteral() && right.isNumericLiteral()) {
        path.replaceWith(types.numericLiteral(left.node.value + right.node.value));
      }
    }
  };

  return { visitor };
};
