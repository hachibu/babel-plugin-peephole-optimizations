export default babel => {
  let { types } = babel;

  return {
    visitor: {
      BinaryExpression(path) {
        let { node: { left, operator, right } } = path;

        if (
          left.type === 'StringLiteral' &&
          right.type === 'StringLiteral' &&
          operator === '+'
        ) {
          path.replaceWith(types.stringLiteral(left.value + right.value));
        } else if (
          left.type === 'NumericLiteral' &&
          right.type === 'NumericLiteral' &&
          operator === '+'
        ) {
          path.replaceWith(types.numericLiteral(left.value + right.value));
        }
      }
    }
  };
};
