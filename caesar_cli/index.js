const fs = require('fs');
const { pipeline, Transform } = require('stream');
const args = require('./check_args');
const caesar = require('./caesar_cipher');

class cryptTransform extends Transform {
  constructor(options) {
    super(options);
    this.crypter = options.crypter;
  }
  _transform(data, encoding, callback) {
    const result = this.crypter(data.toString()) + "\n";
    callback(null, result);
  }
}

const crypter = caesar.setShift(args.shift)[args.action].bind(caesar);
const transformStream = new cryptTransform({crypter});
const readStream = (!args.input) ? process.stdin : fs.createReadStream(args.input);
const writetream = (!args.output) ? process.stdout : fs.createWriteStream(args.output, {flags: 'a'});

pipeline(
  readStream,
  transformStream,
  writetream,
  (error) => {
    if (error) {
      process.stderr.write(`Text encryption error: ${error.message}`);
    }
  }
)
