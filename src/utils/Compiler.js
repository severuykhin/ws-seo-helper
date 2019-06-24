/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
class Compiler {
  compile(data, negativeKeys) {
    return this.multiply(data, negativeKeys);
  }

  multiply(matrix, negativeKeys) {

    if (matrix.length <= 0) return [];
    if (matrix.length === 1) return this.applyNegativeKeys(matrix[0], negativeKeys);

    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

    const values = cartesian(...matrix)
      .map(array => array.join(' '));

    return this.applyNegativeKeys(values, negativeKeys);

  }

  applyNegativeKeys(array, negativeKeys) {
    if (negativeKeys.length <= 0) return array;
    return array.map(value => `${value} -${negativeKeys.join(' -')}`);
  }
}

export default Compiler;