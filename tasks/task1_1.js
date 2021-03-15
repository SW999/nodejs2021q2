var { pipeline, Transform } = require('stream');

class ReverseTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    try {
      var resultString = chunk.toString('utf8').split('').reverse().join('');

      callback(null, `${resultString}\n`);
    } catch (err) {
      callback(err);
    }
  }
}

pipeline(
  process.stdin,
  new ReverseTransform(),
  process.stdout,
  function (err) {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
