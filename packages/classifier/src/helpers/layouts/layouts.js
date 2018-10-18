const layouts = {}

Object.defineProperty(layouts, 'default', {
  value: 'default',
  enumerable: true
})

// helper for returning layouts (e.g. for use in MST enumerable type)
Object.defineProperty(layouts, 'values', {
  value: Object.values(layouts)
})

export default layouts
