const readline = require('readline');
const process = require('process');
const path = require('path');

module.exports.ask = (question) => new Promise((resolve) => {
  const createdInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  createdInterface.question(`${question} `, (answer) => {
    createdInterface.close();
    resolve(answer);
  });
});

module.exports.write = console.log;

module.exports.getArg = (key, type = 'string') => {
  const args = process.argv.slice(2);
  const index = args.indexOf(key);
  if (index !== -1 && typeof args[index + 1] !== 'undefined') {
    const value = args[index + 1];
    if (type === 'number') {
      return Number(value);
    }
    if (type === 'path') {
      return path.resolve(process.cwd(), value);
    }
    return value;
  }
  return null;
};

module.exports.hasArg = (key) => {
  const args = process.argv.slice(2);
  const index = args.indexOf(key);
  return index !== -1;
};

module.exports.args = () => {
  return process.argv.slice(2);
};
