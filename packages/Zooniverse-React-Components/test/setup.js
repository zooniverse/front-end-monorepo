/* eslint-env browser, mocha */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import React from 'react';
import chai from 'chai';
import { jsdom } from 'jsdom';

// Set up fake DOM for use by Enzyme's mount() method.
const exposedProperties = ['window', 'navigator', 'document'];

global.React = React;
global.expect = chai.expect;

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
