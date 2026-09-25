import strategy from './index'

const createRule = strategy.createRule

describe('feedback geo polygon create-rule', function () {
  const subjectRule = {
    coordinates: '[[-91.0, 48.0], [-90.98, 48.0], [-90.98, 48.01], [-91.0, 48.01]]',
    id: 'pond'
  }

  const workflowRule = {
    defaultFailureMessage: 'Outside the pond.',
    defaultSuccessMessage: 'Inside the pond.',
    defaultTolerance: '100',
    failureEnabled: true,
    hideSubjectViewer: false,
    id: 'pond',
    strategy: 'geoPolygon',
    successEnabled: true
  }

  it('should return a valid rule with parsed coordinates', function () {
    expect(createRule(subjectRule, workflowRule)).to.deep.equal({
      coordinates: [[-91.0, 48.0], [-90.98, 48.0], [-90.98, 48.01], [-91.0, 48.01]],
      failureEnabled: true,
      failureMessage: 'Outside the pond.',
      hideSubjectViewer: false,
      id: 'pond',
      strategy: 'geoPolygon',
      successEnabled: true,
      successMessage: 'Inside the pond.',
      tolerance: '100'
    })
  })

  it('should reject a ring with fewer than three positions', function () {
    expect(createRule({ ...subjectRule, coordinates: '[[-91.0, 48.0], [-90.98, 48.0]]' }, workflowRule)).to.deep.equal({})
  })
})
