export default babel => {
  const visitor = {
    BlockStatement(path) {
      let varDecs = path.node.body.filter(node =>
        !!node.declarations?.find(dec => dec.init.type.endsWith('Literal')));

      // 1. Find var declarations with a literal init.
      // 2. Traverse sub-expressions and expand references to var declarations.

      console.log(varDecs);

      path.skip();
    }
  };

  return {
    name: 'constant-propagation',
    visitor
  };
};
