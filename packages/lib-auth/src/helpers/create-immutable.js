/**
 * Creates an immutable property on an object by modifying it in place.
 *
 * @param {Object} object - the object to add an immutable property to
 * @param {*} key - the key of the immutable property
 * @param {*} value - the value of the immutable property
 * @returns {void}
 */
function createImmutable (object, key, value) {
  Object.defineProperty(object, key, {
    configurable: false,
    enumerable: true,
    value,
    writable: false
  })
}

module.exports = createImmutable
