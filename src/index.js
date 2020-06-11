export default babel => {
  let visitor = {
    BinaryExpression(path) {
      if (!path.isBinaryExpression({ operator: '+' })) {
        return;
      }

      let left  = path.get('left');
      let right = path.get('right');

      if (left.isBinaryExpression({ operator: '+' })) {
        let leaf = getLeaf(left, left.key);
        if (leaf) {
          let typeCtor = getTypeCtor(leaf.node.type);
          leaf.parentPath.replaceWith(
            typeCtor(leaf.parent.left.value + leaf.parent.right.value)
          );
        }
      }

      if (left.isBinaryExpression({ operator: '+' })) {
        let leaf = getLeaf(left, left.key);
        if (leaf) {
          let typeCtor = getTypeCtor(leaf.node.type);
          leaf.parentPath.replaceWith(
            typeCtor(leaf.parent.left.value + leaf.parent.right.value)
          );
        }
      }

      if (
        (left.isStringLiteral() && right.isStringLiteral()) ||
        (left.isNumericLiteral() && right.isNumericLiteral())
      ) {
        let typeCtor = getTypeCtor(left.node.type);
        path.replaceWith(typeCtor(left.node.value + right.node.value));
      }
    }
  };

  function getLeaf(path, direction) {
    if (path.isNumericLiteral() ||path.isStringLiteral()) {
      return path;
    }
    else if (path.isBinaryExpression({ operator: '+' })) {
      return getLeaf(path.get(direction), direction);
    }
  }

  function getTypeCtor(type) {
    let typeCtor;
    if (type === 'StringLiteral') {
      typeCtor = babel.types.stringLiteral;
    }
    else if (type === 'NumericLiteral') {
      typeCtor = babel.types.numericLiteral;
    }
    return typeCtor;
  }

  return { visitor };
};
