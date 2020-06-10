import assert     from 'assert';
import * as babel from '@babel/core';
import * as fs    from 'fs';
import plugin     from '../lib';

let testPaths = fs.readdirSync('test').
  map(name => `test/${name}`).
  filter(path => fs.lstatSync(path).isDirectory());

describe('plugin', () => {
  testPaths.forEach(testPath => {
    let inputPath = `${testPath}/input.js`;
    let outputPath = `${testPath}/output.js`;

    if (!fs.existsSync(inputPath) || !fs.existsSync(outputPath)) {
      this.skip();
    }

    it(testPath, () => {
      let input = babel.transformFileSync(inputPath, { plugins: [plugin] });
      let output = fs.readFileSync(outputPath, 'utf-8').trim();

      assert.equal(input.code, output);
    });
  });
});
