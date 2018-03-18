import assert from 'assert';
import Recurrent from '../../src/recurrent';
import {layer} from '../../src';
const {
  add,
  input,
  multiply,
  output,
  random,
  recurrent } = layer;

describe('Recurrent Class: End to End', () => {
  const xorTrainingData = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
  ];

  it.only('can learn xor', () => {
    const net = new Recurrent({
      inputLayer: () => input({ width: 1 }),
      hiddenLayers: [
        (input, recurrentInput) => recurrent({ height: 3 }, input, recurrentInput),
      ],
      outputLayer: input => output({ width: 1 }, input)
    });
    net.initialize();
    net.initializeDeep();
    //net.initializeDeep();
    assert.equal(net._hiddenLayers.length, 2);
    assert.equal(net._hiddenLayers[0].length, 9);
    assert.equal(net._hiddenLayers[1].length, 9);
    let error;
    for (let i = 0; i < 20; i++) {
      error = net.trainPattern([0, 0], [0], true);
      error += net.trainPattern([0, 1], [1], true);
      error += net.trainPattern([1, 0], [1], true);
      error += net.trainPattern([1, 1], [0], true);
      console.log(error / 4);
    }
    assert(error / 4 < 0.005);
  });
});