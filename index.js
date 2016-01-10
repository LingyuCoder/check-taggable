'use strict';

const execSync = require('child_process').execSync;
const co = require('co');

module.exports = co.wrap(function*(tag, cwd) {
  cwd = cwd || process.cwd();
  if (typeof tag !== 'string') return Promise.reject(new TypeError('Expected tag to be a string'));
  if (typeof cwd !== 'string') return Promise.reject(new TypeError('Expected cwd to be a string'));
  let cmdRst = '';
  try {
    cmdRst = execSync('git tag', {
      cwd: cwd,
      stdio: 'pipe'
    }).toString();
  } catch (e) {
    if (e.message.indexOf('Not a git repository') !== -1)
      return Promise.reject(new Error(`No git repository was found in ${cwd}`));
    return Promise.reject(e);
  }
  return {
    success: cmdRst.split('\n').filter(v => !!v).indexOf(tag) === -1
  };
});
