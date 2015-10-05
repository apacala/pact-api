'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = pactMethod;

var _util = require('./util');

var _methodTypes = require('./methodTypes');

var _methodTypes2 = _interopRequireDefault(_methodTypes);

// This fn to be used from inside a PactResource class/subclass only

function pactMethod(_ref) {
  var _ref$method = _ref.method;
  var method = _ref$method === undefined ? _methodTypes2['default'].GET : _ref$method;
  var _ref$path = _ref.path;
  var path = _ref$path === undefined ? '' : _ref$path;
  var _ref$urlParams = _ref.urlParams;
  var urlParams = _ref$urlParams === undefined ? [] : _ref$urlParams;

  var pathGenerator = _util.makeURLInterpolator(path);

  return function makeRequest(payload) {
    var urlData = {};

    // Check to see if we have all the arguments we require
    urlParams.forEach(function (param) {
      var required = payload[param];
      if (typeof required === 'undefined' || required === null) {
        throw new Error('PactAPI: I require argument "' + param + '", but I got: ' + required);
      }

      // Add it to the url data
      urlData[param] = required;

      // Remove it from the payload
      delete payload[param];
    });

    var resourcePath = this.path;
    var fullPath = resourcePath + '/' + pathGenerator(urlData);
    return this._request(method, fullPath, payload);
  };
}

module.exports = exports['default'];