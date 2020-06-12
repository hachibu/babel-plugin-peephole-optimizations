export default babel => {
  let { types } = babel;

  const visitor = {
    BinaryExpression(path) {
      let left = path.get('left');
      let right = path.get('right');

      if (!right.isNumericLiteral()) {
        return;
      }

      if (right.node.value % 2 === 0) {
        let operators = {
          '*': '<<',
          '/': '>>'
        };
        let operator = operators[path.node.operator];

        if (!operator) {
          return;
        }

        let expr = types.binaryExpression(
          operator,
          left.node,
          types.NumericLiteral(Math.log2(right.node.value))
        );

        path.replaceWith(expr);
      } else {
        let operators = {
          '**': '*',
          '*': '+'
        };
        let operator = operators[path.node.operator];

        if (!operator) {
          return;
        }

        let expr;

        for (let i = 0; i < right.node.value; i++) {
          let subExpr = types.binaryExpression(
            operator,
            left.node,
            left.node
          );

          if (!expr) {
            expr = subExpr;
          } else {
            expr.right = subExpr;
          }
        }

        path.replaceWith(expr);
        path.skip();
      }
    }
  };

  return {
    name: 'strength-reduction',
    visitor
  };
};
