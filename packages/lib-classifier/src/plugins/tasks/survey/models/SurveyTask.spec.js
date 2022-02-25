import { types } from 'mobx-state-tree'
import SurveyTask from '@plugins/tasks/survey'

const surveyTask = {
  characteristics: {
    'LIKE': {
      'label': 'Like',
      'valuesOrder': [
        'CATDOG',
        'COWHORSE',
        'ANTELOPEDEER',
        'PRIMATE',
        'WEASEL',
        'BIRD',
        'OTHER'
      ],
      'values': {
        'CATDOG': {
          'label': 'cat/dog',
          'image': 'cat-dog-icon.svg'
        },
        'COWHORSE': {
          'label': 'cow/horse',
          'image': 'cow-horse-icon.svg'
        },
        'ANTELOPEDEER': {
          'label': 'antelope/deer',
          'image': 'ante-deer-icon.svg'
        },
        'PRIMATE': {
          'label': 'primate',
          'image': 'primate-icon.svg'
        },
        'WEASEL': {
          'label': 'weasel',
          'image': 'weasel-icon.svg'
        },
        'BIRD': {
          'label': 'bird',
          'image': 'bird-icon.svg'
        },
        'OTHER': {
          'label': 'other',
          'image': 'nothing-icon.svg'
        }
      }
    },
    'PATTERN': {
      'label': 'Pattern',
      'valuesOrder': [
        'SOLID',
        'STRIPES',
        'BANDS',
        'SPOTS'
      ],
      'values': {
        'SOLID': {
          'label': 'solid',
          'image': 'solid-icon.svg'
        },
        'STRIPES': {
          'label': 'stripes',
          'image': 'stripes-icon.svg'
        },
        'BANDS': {
          'label': 'bands',
          'image': 'banding-icon.svg'
        },
        'SPOTS': {
          'label': 'spots',
          'image': 'spots-icon.svg'
        }
      }
    },
    'COLOR': {
      'label': 'color',
      'valuesOrder': [
        'TANYELLOW',
        'RED',
        'BROWN',
        'WHITE',
        'GRAY',
        'BLACK'
      ],
      'values': {
        'TANYELLOW': {
          'label': 'tan/yellow',
          'image': 'tan-yellow.svg'
        },
        'RED': {
          'label': 'red',
          'image': 'red.svg'
        },
        'BROWN': {
          'label': 'brown',
          'image': 'brown.svg'
        },
        'WHITE': {
          'label': 'white',
          'image': 'white.svg'
        },
        'GRAY': {
          'label': 'gray',
          'image': 'gray.svg'
        },
        'BLACK': {
          'label': 'black',
          'image': 'black.svg'
        }
      }
    }
  },
  characteristicsOrder: [
    'COLOR',
    'LIKE',
    'PATTERN'
  ],
  choices: {
    'AARDVARK': {
      'label': 'Aardvark',
      'description': 'Not as awesome as a pangolin, but surprisingly big.',
      'noQuestions': false,
      'images': [
        'aardvark-1.jpg',
        'aardvark-2.jpg',
        'aardvark-3.jpg'
      ],
      'characteristics': {
        'LIKE': [
          'WEASEL',
          'OTHER'
        ],
        'PATTERN': [
          'SOLID'
        ],
        'COLOR': [
          'RED',
          'BROWN',
          'GRAY'
        ]
      },
      'confusionsOrder': [
        'FIRE'
      ],
      'confusions': {
        'FIRE': `You probably shouldn't be getting these confused.`
      }
    },
    'BABOON': {
      'label': 'Baboon',
      'description': 'AKA the creatures that break into your house and destroy everything.',
      'noQuestions': false,
      'images': [
        'baboon-1.jpg',
        'baboon-2.jpg',
        'baboon-3.jpg'
      ],
      'characteristics': {
        'LIKE': [
          'CATDOG',
          'PRIMATE',
          'OTHER'
        ],
        'PATTERN': [
          'SOLID'
        ],
        'COLOR': [
          'TANYELLOW',
          'BROWN',
          'GRAY'
        ]
      },
      'confusionsOrder': [],
      'confusions': {}
    },
    'FIRE': {
      'label': 'Fire',
      'description': `It's a fire. Pretty sure you know what this looks like.`,
      'noQuestions': true,
      'images': [
        'fire-1.jpg'
      ],
      'characteristics': {
        'LIKE': [],
        'PATTERN': [],
        'COLOR': []
      },
      'confusionsOrder': [],
      'confusions': {}
    }
  },
  choicesOrder: [
    'AARDVARK',
    'BABOON',
    'FIRE'
  ],
  exclusions: [''],
  images: {},
  inclusions: [''],
  questions: {
    'HOWMANY': {
      'label': 'How many?',
      'multiple': false,
      'required': true,
      'answersOrder': [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '1150',
        '51'
      ],
      'answers': {
        '1': {
          'label': '1'
        },
        '2': {
          'label': ' 2'
        },
        '3': {
          'label': ' 3'
        },
        '4': {
          'label': ' 4'
        },
        '5': {
          'label': ' 5'
        },
        '6': {
          'label': ' 6'
        },
        '7': {
          'label': ' 7'
        },
        '8': {
          'label': ' 8'
        },
        '9': {
          'label': ' 9'
        },
        '10': {
          'label': ' 10'
        },
        '51': {
          'label': ' 51+'
        },
        '1150': {
          'label': ' 11-50'
        }
      }
    },
    'WHATBEHAVIORSDOYOUSEE': {
      'label': 'What behaviors do you see?',
      'multiple': true,
      'required': true,
      'answersOrder': [
        'RESTING',
        'STANDING',
        'MOVING',
        'EATING',
        'INTERACTING'
      ],
      'answers': {
        'RESTING': {
          'label': 'Resting'
        },
        'STANDING': {
          'label': ' Standing'
        },
        'MOVING': {
          'label': ' Moving'
        },
        'EATING': {
          'label': ' Eating'
        },
        'INTERACTING': {
          'label': ' Interacting'
        }
      }
    },
    'ARETHEREANYYOUNGPRESENT': {
      'label': 'Are there any young present?',
      'multiple': false,
      'required': false,
      'answersOrder': [
        'YES',
        'NO'
      ],
      'answers': {
        'YES': {
          'label': 'Yes'
        },
        'NO': {
          'label': ' No'
        }
      }
    },
    'DOYOUSEEANYHORNS': {
      'label': 'Do you see any horns?',
      'multiple': false,
      'required': false,
      'answersOrder': [
        'YES',
        'NO'
      ],
      'answers': {
        'YES': {
          'label': 'Yes'
        },
        'NO': {
          'label': ' No'
        }
      }
    },
    'DONTCARE': {
      'label': `Don't care?`,
      'multiple': false,
      'required': true,
      'answersOrder': [
        'YES',
        'NO'
      ],
      'answers': {
        'YES': {
          'label': 'Yes'
        },
        'NO': {
          'label': ' No'
        }
      }
    },
    'CLICKWOWIFTHISISANAWESOMEPHOTO': {
      'label': `Click 'WOW!' if this is an awesome photo`,
      'multiple': false,
      'required': false,
      'answersOrder': [
        'WOW'
      ],
      'answers': {
        'WOW': {
          'label': 'WOW!'
        }
      }
    }
  },
  questionsMap: {
    'AARDVARK': [
      'HOWMANY',
      'WHATBEHAVIORSDOYOUSEE',
      'ARETHEREANYYOUNGPRESENT',
      'CLICKWOWIFTHISISANAWESOMEPHOTO'
    ],
    'BABOON': [
      'HOWMANY',
      'WHATBEHAVIORSDOYOUSEE',
      'ARETHEREANYYOUNGPRESENT',
      'CLICKWOWIFTHISISANAWESOMEPHOTO'
    ]

  },
  questionsOrder: [
    'HOWMANY',
    'WHATBEHAVIORSDOYOUSEE',
    'ARETHEREANYYOUNGPRESENT',
    'CLICKWOWIFTHISISANAWESOMEPHOTO'
  ],
  required: '',
  taskKey: 'T0',
  type: 'survey'
}

const surveyAnnotation = [
  {
    'choice': 'AARDVARK',
    'answers': {
      'HOWMANY': '1',
      'WHATBEHAVIORSDOYOUSEE': [
        'INTERACTING'
      ],
      'ARETHEREANYYOUNGPRESENT': 'NO',
      'CLICKWOWIFTHISISANAWESOMEPHOTO': 'WOW'
    },
    'filters': {
      'COLOR': 'RED'
    }
  }
]

describe('Model > SurveyTask', function () {
  it('should exist', function () {
    const surveyTaskInstance = SurveyTask.TaskModel.create(surveyTask)
    expect(surveyTaskInstance).to.be.ok()
    expect(surveyTaskInstance).to.be.an('object')
    expect(surveyTaskInstance.type).to.equal('survey')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      SurveyTask.TaskModel.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('when characteristics are invalid', function () {
    it('should error when the characteristics key is not a string', function () {
      const surveyTask = {
        characteristics: {
          0: {
            'label': 'Like',
            'valuesOrder': [
              'CATDOG',
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              'CATDOG': {
                'label': 'cat/dog',
                'image': 'cat-dog-icon.svg'
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })

    it('should error when a characteristic label is not a string', function () {
      const surveyTask = {
        characteristics: {
          'LIKE': {
            'label': 0,
            'valuesOrder': [
              'CATDOG',
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              'CATDOG': {
                'label': 'cat/dog',
                'image': 'cat-dog-icon.svg'
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })

    it('should error when an item in the valuesOrder array is not a string', function () {
      const surveyTask = {
        characteristics: {
          'LIKE': {
            'label': 'Like',
            'valuesOrder': [
              0,
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              'CATDOG': {
                'label': 'cat/dog',
                'image': 'cat-dog-icon.svg'
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })

    it('should error when a characteristic values key is not a string', function () {
      const surveyTask = {
        characteristics: {
          'LIKE': {
            'label': 'Like',
            'valuesOrder': [
              'CATDOG',
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              0: {
                'label': 'cat/dog',
                'image': 'cat-dog-icon.svg'
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })

    it('should error when a characteristic values label is not a string', function () {
      const surveyTask = {
        characteristics: {
          'LIKE': {
            'label': 'Like',
            'valuesOrder': [
              'CATDOG',
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              'CATDOG': {
                'label': 0,
                'image': 'cat-dog-icon.svg'
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })

    it('should error when a characteristic values image is not a string', function () {
      const surveyTask = {
        characteristics: {
          'LIKE': {
            'label': 'Like',
            'valuesOrder': [
              'CATDOG',
              'COWHORSE',
              'ANTELOPEDEER',
              'PRIMATE',
              'WEASEL',
              'BIRD',
              'OTHER'
            ],
            'values': {
              'CATDOG': {
                'label': 'cat/dog',
                'image': 0
              },
            }
          }
        },
        characteristicsOrder: [],
        choicesOrder: '',
        exclusions: '',
        inclusions: [],
        questionsOrder: []
      }

      let errorThrown = false
      try {
        SurveyTask.TaskModel.create(surveyTask)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = SurveyTask.TaskModel.create(surveyTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('survey')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('Views > isComplete', function () {
    describe('with required identification', function () {
      let annotation
      let task

      before(function () {
        const requiredTask = Object.assign({}, surveyTask, { required: 'true' })
        task = SurveyTask.TaskModel.create(requiredTask)
        annotation = task.defaultAnnotation()
      })

      describe('without annotation', function () {
        it('should be incomplete', function () {
          expect(task.isComplete(annotation)).to.be.false()
        })
      })

      describe('with a complete annotation', function () {
        it('should be complete', function () {
          annotation.update(surveyAnnotation)
          expect(task.isComplete(annotation)).to.be.true()
        })
      })

      describe('with an identification in progress', function () {
        it('should be incomplete', function () {
          annotation.setChoiceInProgress(true)
          expect(task.isComplete(annotation)).to.be.false()
        })
      })
    })

    describe('without required identification', function () {
      let annotation
      let task

      before(function () {
        task = SurveyTask.TaskModel.create(surveyTask)
        annotation = task.defaultAnnotation()
      })

      describe('without annotation', function () {
        it('should be complete', function () {
          expect(task.isComplete(annotation)).to.be.true()
        })
      })

      describe('with a complete annotation', function () {
        it('should be complete', function () {
          annotation.update(surveyAnnotation)
          expect(task.isComplete(annotation)).to.be.true()
        })
      })

      describe('with an identification in progress', function () {
        it('should be incomplete', function () {
          annotation.setChoiceInProgress(true)
          expect(task.isComplete(annotation)).to.be.false()
        })
      })
    })
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = SurveyTask.TaskModel.create(surveyTask)
      annotation = task.defaultAnnotation()
    })

    it('should start up with an empty array', function () {
      expect(annotation.value).to.be.an('array')
      expect(annotation.value).to.have.lengthOf(0)
    })

    it('should update annotations', function () {
      annotation.update(surveyAnnotation)
      expect(annotation.value).to.deep.equal(surveyAnnotation)
    })
  })
})
