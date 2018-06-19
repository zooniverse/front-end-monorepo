/* eslint-env browser, mocha */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import React from 'react';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { JSDOM } from 'jsdom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

chai.use(dirtyChai);
global.React = React;
global.expect = chai.expect;

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });
