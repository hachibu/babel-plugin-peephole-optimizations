export default babel => {
  let { types } = babel;

  const visitor = {
    BinaryExpression(path) {
      let left = path.get('left');
      let right = path.get('right');

      if (right.isNumericLiteral() && right.node.value % 2 === 0) {
        if (path.node.operator === '*' || path.node.operator === '/') {
          let operators = {
            '*': '<<',
            '/': '>>'
          };
          let operator = operators[path.node.operator];
          let expr = types.binaryExpression(
            operator,
            left.node,
            types.NumericLiteral(Math.log2(right.node.value))
          );

          path.replaceWith(expr);
        }
      }
      else if (left.isNumericLiteral() && right.isNumericLiteral()) {
        let operators = {
          '**': '*',
          '*': '+'
        };
        let weakerOperator = operators[path.node.operator];

        if (weakerOperator) {
          let code = `${left.node.value}`;

          for (let i = 0; i < right.node.value - 1; i++) {
            code += `${weakerOperator} ${left.node.value}`;
          }

          path.replaceWith(babel.template.expression(code)());
          path.skip();
        }
      }
    }
  };

  return {
    name: 'strength-reduction',
    visitor
  };
};
