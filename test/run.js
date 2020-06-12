import assert              from 'assert';
import * as babel          from '@babel/core';
import * as fs             from 'fs';
import constantFolding     from '../lib/constant-folding';
import constantPropagation from '../lib/constant-propagation';
import strengthReduction   from '../lib/strength-reduction';

describe('babel-plugin-peephole-optimizations', () => {
  let testPaths = fs.
    readdirSync('test').
    map(name => `test/${name}`).
    filter(path => fs.lstatSync(path).isDirectory());

  testPaths.forEach(testPath => {
    it(testPath, () => {
      let plugins = [];

      if (testPath.includes('constant-folding')) {
        plugins.push(constantFolding);
      }
      else if (testPath.includes('constant-propagation')) {
        plugins.push(constantPropagation);
        return;
      }
      else if (testPath.includes('strength-reduction')) {
        plugins.push(strengthReduction);
      }

      let input = babel.transformFileSync(`${testPath}/input.js`, { plugins });
      let output = fs.readFileSync(`${testPath}/output.js`, 'utf-8').trim();

      assert.equal(input.code, output);
    });
  });
});
