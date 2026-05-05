import UnitSelect from './UnitSelect'

export default {
  title: 'Subject Viewers / GeoMapViewer / UnitSelect',
  component: UnitSelect,
}

export const Default = {
  args: {
    value: 'meters',
    onChange: (unit) => console.log('Unit selected:', unit)
  }
}
