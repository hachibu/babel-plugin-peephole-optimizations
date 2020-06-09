import _          from 'lodash';
import assert     from 'assert';
import * as babel from '@babel/core';
import * as fs    from 'fs';
import plugin     from '../lib';

let testPaths = _(fs.readdirSync('test')).
  map(name => _.join(['test', name], '/')).
  filter(path => fs.lstatSync(path).isDirectory()).
  value();

describe('plugin', () => {
  _.each(testPaths, testPath => {
    let inputPath = `${testPath}/input.js`;
    let outputPath = `${testPath}/output.js`;

    if (!fs.existsSync(inputPath) || !fs.existsSync(outputPath)) {
      this.skip();
    }

    it(testPath, () => {
      let input = babel.transformFileSync(inputPath, { plugins: [plugin] });
      let output = _.trim(fs.readFileSync(outputPath, 'utf-8'));

      assert.equal(input.code, output);
    });
  });
});
