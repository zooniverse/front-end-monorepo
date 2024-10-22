import { AlgorithmAStar } from './../helpers/AlgorithmAStar'
import { ModelViewer } from './../models/ModelViewer'
import { AnnotationBase } from './../models/ModelAnnotations'
import subjectData from './../data/4x4x4.json'

describe('Component > VolumetricViewer > AlgorithmAStar', () => {
  const data = Buffer.from(subjectData, 'base64')
  const viewer = ModelViewer().initialize({ data })
  const point = 1
  const annotation = AnnotationBase({ point })

  it('should generate the same connected points', () => {
    const resultsP0 = AlgorithmAStar({ annotation, point: 0, viewer })
    const resultsP1 = AlgorithmAStar({ annotation, point: 1, viewer })
    const resultsP4 = AlgorithmAStar({ annotation, point: 4, viewer })

    expect(resultsP0.data).deep.to.equal([0, 1, 4])
    expect(resultsP1.data).deep.to.equal([0, 1, 4])
    expect(resultsP4.data).deep.to.equal([0, 1, 4])
  })
})
