function createElement () {
  const element = document.createElement('div')
  element.id = `authRoot-${Date.now()}`
  document.body.appendChild(element)
  return element
}

export default createElement

