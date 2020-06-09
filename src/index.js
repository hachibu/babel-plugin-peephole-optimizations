import _ from 'lodash';

export default ({ types: t }) => {
  return {
    visitor: {
      BinaryExpression(path) {
        let { node: { left, operator, right } } = path;

        if (
          left.type === 'StringLiteral' &&
          right.type === 'StringLiteral' &&
          operator === '+'
        ) {
          path.replaceWith(t.stringLiteral(left.value + right.value));
        } else if (
          left.type === 'NumericLiteral' &&
          right.type === 'NumericLiteral' &&
          operator === '+'
        ) {
          path.replaceWith(t.numericLiteral(left.value + right.value));
        }
      }
    }
  };
};
