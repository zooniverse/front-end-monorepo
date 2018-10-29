import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('locations', () => {
    return [1, 2].map((int) => {
      const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
      return { 'image/png': `https://foo.bar/${randomString}.png` }
    })
  })
  .attr('metadata', {})
