'use strict';

require('should');
const checker = require('../index');
const fs = require('fs');
const path = require('path');
const os = require('os');
const execSync = require('child_process').execSync;

describe('check-tracked', () => {
  describe('success', () => {
    it('should resolve object with success true if tag can be used', () => {
      return checker('publish/success').should.be.fulfilledWith({
        success: true
      });
    });
  });
  describe('fail', () => {
    beforeEach(() => execSync('git tag -a publish/test'));
    afterEach(() => execSync('git tag -d publish/test'));
    it('should resolve object with success false if tag had been used', () => {
      return checker('publish/fail').should.be.fulfilledWith({
        success: false
      });
    });
  });
  describe('error', () => {
    it('should reject with an error when tag is not a string', () => {
      return checker({}).should.be.rejectedWith(TypeError, {
        message: 'Expected tag to be a string'
      });
    });
    it('should reject with an error when cwd is not a string', () => {
      return checker('publish/test', {}).should.be.rejectedWith(TypeError, {
        message: 'Expected cwd to be a string'
      });
    });
  });
});
