import { shallow } from 'enzyme'

import SubjectGroupViewer, { SVG } from './SubjectGroupViewer'
import SGVGridCell from './components/SGVGridCell'

let wrapper

describe('Component > SubjectGroupViewer', function () {
  const exampleImages = [
    {
      src: 'https://foo.bar/example1.png',
      naturalHeight: 400,
      naturalWidth: 300,
    },
    {
      src: 'https://foo.bar/example2.png',
      naturalHeight: 400,
      naturalWidth: 300,
    },
    {
      src: 'https://foo.bar/example3.png',
      naturalHeight: 400,
      naturalWidth: 300,
    },
    {
      src: 'https://foo.bar/example4.png',
      naturalHeight: 400,
      naturalWidth: 300,
    },
  ]
  
  const exampleSubjectIds = ['1000', '1001', '1002', '1003']
  
  beforeEach(function () {
    wrapper = shallow(
      <SubjectGroupViewer
        images={exampleImages}
        subjectIds={exampleSubjectIds}
        dragMove={() => {}}
        onKeyDown={() => {}}
        cellWidth={800}
        cellHeight={600}
        cellStyle={{
          stroke: '#fff',
          strokeWidth: '4',
          fill: '#000',
        }}
        gridRows={2}
        gridColumns={2}
        width={1600}
        height={1200}
        panX={0}
        panY={0}
        zoom={1}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
  it('should render 4 grid cells', function () {
    expect(wrapper.find(SGVGridCell)).to.have.lengthOf(4)
  })
  
  it('should render grid cells with the correct props', function () {
    const gridCells = wrapper.find(SGVGridCell)
    const LAST_INDEX = exampleImages.length - 1
    
    expect(gridCells.last().props().image).to.deep.equal(exampleImages[LAST_INDEX])
    expect(gridCells.last().props().subjectId).to.equal(exampleSubjectIds[LAST_INDEX])
    expect(gridCells.last().props().index).to.equal(LAST_INDEX)
  })
  
  it('should have a viewBox proportional to width and height', function () {
    const viewBox = wrapper.find(SVG).prop('viewBox')
    expect(viewBox).to.have.string('0 0 1600 1200')
  })
})
