function callWithPromise(func, ...args) {
  try {
    return Promise.resolve(func(...args))
  } catch (err) {
    return Promise.reject(err)
  }
}

const asyncSessionStorage = {
  // must use wrapper functions when passing localStorage functions (https://github.com/agilgur5/mst-persist/issues/18)
  clear() {
    return callWithPromise(() => window.sessionStorage.clear())
  },
  getItem(key) {
    return callWithPromise(() => window.sessionStorage.getItem(key))
  },
  removeItem(key) {
    return callWithPromise(() => window.sessionStorage.removeItem(key))
  },
  setItem (key, value) {
    return callWithPromise(() => window.sessionStorage.setItem(key, value))
  }
}

export default asyncSessionStorage
