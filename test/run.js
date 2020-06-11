import assert            from 'assert';
import * as babel        from '@babel/core';
import * as fs           from 'fs';
import constantFolding   from '../lib/constant-folding';
import strengthReduction from '../lib/strength-reduction';

let testPaths = fs.readdirSync('test').
  map(name => `test/${name}`).
  filter(path => fs.lstatSync(path).isDirectory());

describe('plugin', () => {
  testPaths.forEach(testPath => {
    let inputPath = `${testPath}/input.js`;
    let outputPath = `${testPath}/output.js`;

    it(testPath, () => {
      let plugins = [];

      if (inputPath.includes('constant-folding')) {
        plugins.push(constantFolding);
      }
      else if (inputPath.includes('strength-reduction')) {
        plugins.push(strengthReduction);
      }

      let input = babel.transformFileSync(inputPath, { plugins });
      let output = fs.readFileSync(outputPath, 'utf-8').trim();

      assert.equal(input.code, output);
    });
  });
});
