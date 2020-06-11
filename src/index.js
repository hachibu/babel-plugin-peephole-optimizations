export default babel => {
  const visitor = {
    BinaryExpression(path) {
      let left = path.get('left');
      let right = path.get('right');

      while (left.isBinaryExpression({ operator: '+' })) {
        let leaf = getLeaf(left, left.key);
        if (leaf) {
          let typeCtor = babel.types[leaf.node.type];
          leaf.parentPath.replaceWith(
            typeCtor(leaf.parent.left.value + leaf.parent.right.value)
          );
        }
      }

      if (
        left.isStringLiteral() && right.isStringLiteral() ||
        left.isNumericLiteral() && right.isNumericLiteral()
      ) {
        let typeCtor = babel.types[left.node.type];
        path.replaceWith(
          typeCtor(left.node.value + right.node.value)
        );
      }
    }
  };

  const getLeaf = (path, key) =>
    path.isBinaryExpression()
      ? getLeaf(path.get(key), key)
      : path;

  return { visitor };
};
