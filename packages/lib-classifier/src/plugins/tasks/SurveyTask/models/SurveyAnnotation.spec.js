import SurveyAnnotation from './SurveyAnnotation'

describe('Model > SurveyAnnotation', function () {
  describe('with a selected choice', function () {
    let surveyAnnotation

    before(function () {
      surveyAnnotation = SurveyAnnotation.create({
        id: 'survey1',
        task: 'T0',
        taskType: 'survey',
        value: [{
          answers: {},
          choice: 'WHISTLE',
          filters: {}
        }]
      })
    })

    it('should exist', function () {
      expect(surveyAnnotation).to.be.ok()
      expect(surveyAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(surveyAnnotation.isComplete).to.be.true()
    })

    it('should error for invalid annotations', function () {
      let errorThrown = false
      try {
        SurveyAnnotation.create({
          id: 'survey1',
          task: 'T0',
          taskType: 'survey',
          value: [{
            choice: 1
          }]
        })
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })

  describe('with multiple selected choices', function () {
    let surveyAnnotation

    before(function () {
      surveyAnnotation = SurveyAnnotation.create({
        id: 'survey1',
        task: 'T0',
        taskType: 'survey',
        value: [
          {
            choice: 'aa',
            answers: {
              'ho': 'one',
              'be': [
                'ea',
                'mo'
              ],
              'in': 'n',
              'hr': [
                'y'
              ]
            },
            filters: {}
          },
          {
            choice: 'to',
            answers: {
              'ho': 'one',
              'be': [
                'mo'
              ],
              'in': 'n',
              'bt': 'Y'
            },
            filters: {
              'co': 'gr',
              'pa': 'so'
            }
          },
          {
            choice: '429',
            answers: {
              'ho': 'two',
              'hr': [],
              'be': [
                'mo'
              ]
            },
            filters: {}
          }
        ]
      })
    })

    it('should exist', function () {
      expect(surveyAnnotation).to.be.ok()
      expect(surveyAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(surveyAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected choice', function () {
    let surveyAnnotation

    before(function () {
      surveyAnnotation = SurveyAnnotation.create({ id: 'survey1', task: 'T0', taskType: 'survey' })
    })

    it('should exist', function () {
      expect(surveyAnnotation).to.be.ok()
      expect(surveyAnnotation).to.be.an('object')
    })

    it('should have a default value', function () {
      expect(surveyAnnotation.value).to.have.lengthOf(0)
    })

    it('should be incomplete', function () {
      expect(surveyAnnotation.isComplete).to.be.false()
    })
  })
})
