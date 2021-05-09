const minimist = require('minimist');
const fs = require('fs');

let argv = process.argv.slice(2);
let args = minimist(argv, {
  alias: {
    s: 'shift',
    i: 'input',
    o: 'output',
    a: 'action',
  }
});

function getActionError(action) {
  if (!action) {
    return 'Argument --action (-a) <encode|decode> must be specified.';
  }
  if (action !== 'encode' && action !== 'decode') {
    return 'Argument --action (-a) can only be encode or decode.';
  }
  return false;
}

function getShiftError(shift) {
  if (shift !== parseInt(shift)) {
    return 'Argument --shift (-s) must be specified and be integer.'
  }
  return false;
}

function getArgShift(args, argv) {
  if (args.shift === true) {
    const shiftIdx = argv.indexOf('--shift');
    const sh = shiftIdx > -1 ? shiftIdx : argv.indexOf('-s');
    return parseFloat(argv[sh + 1]);
  }
  return args.shift;
}

if (args.input) {
  try {
    fs.accessSync(args.input, fs.constants.F_OK);
  } catch (error) {
    process.stderr.write(
      `Input file "${args.input}" does not exist.`
    );
    process.exit(9);
  }
}

if (args.output) {
  try {
    fs.accessSync(args.output, fs.constants.F_OK | fs.constants.W_OK);
  } catch (error) {
    process.stderr.write(
      `Output file "${args.output}" ${(error.code === 'ENOENT') ? 'does not exist' : 'is not writable'}`
    );
    process.exit(9);
  }
}

args.shift = getArgShift(args, argv);

const argsError = getShiftError(args.shift) || getActionError(args.action);

if (argsError) {
  process.stderr.write(argsError);
  process.exit(9);
}

module.exports = args;