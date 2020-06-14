export default babel => {
  const visitor = {
    BlockStatement(path) {
      let varDecs = path.node.body.filter(node =>
        !!node.declarations?.find(d => d.init.type.endsWith('Literal')));

      let bindings = new Map();

      varDecs.forEach(varDec =>
        varDec.declarations.forEach(d => bindings.set(d.id.name, d.init)));

      path.traverse({
        BinaryExpression(path) {
          let left = path.get('left');
          let right = path.get('right');
          let id;

          if (left.isIdentifier()) {
            id = left;
          }
          else if (right.isIdentifier()) {
            id = right;
          }

          if (!id) {
            return;
          }

          let lit = bindings.get(id.node.name);

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
    visitor
  };
};
