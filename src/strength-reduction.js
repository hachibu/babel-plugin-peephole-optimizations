export default babel => {
  const visitor = {
    BinaryExpression(path) {
      let left = path.get('left');
      let right = path.get('right');

      if (left.isNumericLiteral() && right.isNumericLiteral()) {
        if (path.node.operator === '*') {
          let template = `${left.node.value}`;

          for (let i = 0; i < right.node.value - 1; i++) {
            template += ` + ${left.node.value}`;
          }

          let ast = babel.template.expression(template)();

          path.replaceWith(ast);
        }
      }
    }
  };

  return {
    name: 'strength-reduction',
    visitor
  };
};
