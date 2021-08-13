const envIsTest = process.env.NODE_ENV === "test";

const runTestLogs = false;
const level = 5;

const debug = (...params) => {
  if (!envIsTest && level >= 5) {
    console.log(...params);
  }
};

const loc = (...params) => {
  if (!envIsTest && level >= 4) {
    console.log(...params);
  }
};

const info = (...params) => {
  if (!envIsTest && level >= 3) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (!envIsTest && level >= 2) {
    console.log(...params);
  }
};

const request = (...params) => {
  if (!envIsTest && level >= 1) {
    console.log(...params);
  }
};

const test = (...params) => {
  if (envIsTest && runTestLogs) {
    console.log(...params);
  }
};

module.exports = {
  info,
  error,
  loc,
  request,
  debug,
  test,
};
