import strategy from './index'

const createRule = strategy.createRule

describe('feedback geo line create-rule', function () {
  const subjectRule = {
    coordinates: '[[-91.0, 48.0], [-90.99, 48.0], [-90.98, 48.001]]',
    id: 'dam-crest'
  }

  const workflowRule = {
    defaultFailureMessage: 'That is not along the crest.',
    defaultSuccessMessage: 'You traced the dam crest.',
    defaultTolerance: '15',
    failureEnabled: true,
    hideSubjectViewer: false,
    id: 'dam-crest',
    strategy: 'geoLine',
    successEnabled: true
  }

  it('should return a valid rule with parsed coordinates', function () {
    expect(createRule(subjectRule, workflowRule)).to.deep.equal({
      coordinates: [[-91.0, 48.0], [-90.99, 48.0], [-90.98, 48.001]],
      failureEnabled: true,
      failureMessage: 'That is not along the crest.',
      hideSubjectViewer: false,
      id: 'dam-crest',
      strategy: 'geoLine',
      successEnabled: true,
      successMessage: 'You traced the dam crest.',
      tolerance: '15'
    })
  })

  it('should prefer subject-specific settings over workflow defaults', function () {
    const rule = createRule({ ...subjectRule, tolerance: '5', successMessage: 'Nice trace' }, workflowRule)
    expect(rule.tolerance).to.equal('5')
    expect(rule.successMessage).to.equal('Nice trace')
  })

  it('should reject a line with fewer than two positions', function () {
    expect(createRule({ ...subjectRule, coordinates: '[[-91.0, 48.0]]' }, workflowRule)).to.deep.equal({})
  })

  it('should reject malformed coordinates', function () {
    expect(createRule({ ...subjectRule, coordinates: 'not json' }, workflowRule)).to.deep.equal({})
    expect(createRule({ id: 'dam-crest' }, workflowRule)).to.deep.equal({})
  })
})
