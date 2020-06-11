export default babel => {
  const visitor = {
    BinaryExpression(path) {
      let left = path.get('left');
      let right = path.get('right');

      if (left.isNumericLiteral() && right.isNumericLiteral()) {
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
