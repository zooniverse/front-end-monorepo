import convertWorkflowToUseSteps from './'
import {
  DrawingTaskFactory,
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'

describe('Helpers > convertWorkflowToUseSteps', function () {
  const testCases = [
    {
      name: 'single task workflows',
      input: {
        first_task: 'T0',
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes' },
              { label: 'No' }
            ]
          })
        }
      },
      output: {
        steps: [
          ['S0', {
            next: undefined,
            stepKey: 'S0',
            taskKeys: ['T0']
          }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes' },
              { label: 'No' }
            ]
          })
        }
      }
    },
    // linear workflow T0 -> T1 -> T2
    {
      name: 'multiple task workflows (sequential task order)',
      input: {
        first_task: 'T0',
        tasks: {
          T0: MultipleChoiceTaskFactory.build({ taskKey: 'T0', next: 'T1' }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', next: 'T2' }),
          T2: DrawingTaskFactory.build({ taskKey: 'T2'})
        }
      },
      output: {
        steps: [
          ['S0', {
            next: 'S1',
            stepKey: 'S0',
            taskKeys: ['T0']
          }],
          ['S1', {
            next: 'S2',
            stepKey: 'S1',
            taskKeys: ['T1']
          }],
          ['S2', {
            next: undefined,
            stepKey: 'S2',
            taskKeys: ['T2']
          }]
        ],
        tasks: {
          T0: MultipleChoiceTaskFactory.build({ taskKey: 'T0', next: 'T1' }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', next: 'T2' }),
          T2: DrawingTaskFactory.build({ taskKey: 'T2'})
        }
      }
    },
    // linear workflow T1 -> T0 -> T2
    {
      name: 'multiple task workflows (mixed task order)',
      input: {
        first_task: 'T1',
        tasks: {
          T0: MultipleChoiceTaskFactory.build({ taskKey: 'T0', next: 'T2' }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', next: 'T0' }),
          T2: DrawingTaskFactory.build({ taskKey: 'T2'})
        }
      },
      output: {
        steps: [
          ['S0', {
            next: 'S1',
            stepKey: 'S0',
            taskKeys: ['T1']
          }],
          ['S1', {
            next: 'S2',
            stepKey: 'S1',
            taskKeys: ['T0']
          }],
          ['S2', {
            next: undefined,
            stepKey: 'S2',
            taskKeys: ['T2']
          }]
        ],
        tasks: {
          T0: MultipleChoiceTaskFactory.build({ taskKey: 'T0', next: 'T2' }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', next: 'T0' }),
          T2: DrawingTaskFactory.build({ taskKey: 'T2'})
        }
      }
    },
    // [T0, T1] -> T2
    {
      name: 'combo task as first step',
      input: {
        first_task: 'T3',
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes' },
              { label: 'No' }
            ]
          }),
          T1: DrawingTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' }),
          T3: {
            next: 'T2',
            taskKey: 'T3',
            type: 'combo',
            tasks: ['T0', 'T1']
          }
        }
      },
      output: {
        steps: [
          ['S0', {
            next: 'S1',
            stepKey: 'S0',
            taskKeys: ['T0', 'T1']
          }],
          ['S1', {
            next: undefined,
            stepKey: 'S1',
            taskKeys: ['T2']
          }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes' },
              { label: 'No' }
            ]
          }),
          T1: DrawingTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' }),
          T3: {
            next: 'T2',
            taskKey: 'T3',
            type: 'combo',
            tasks: ['T0', 'T1']
          }
        }
      }
    }, 
    // T0 -> T1 or T2
    {
      name: 'single choice branching first question',
      input: {
        first_task: 'T0',
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes', next: 'T1' },
              { label: 'No', next: 'T2' }
            ]
          }),
          T1: DrawingTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' })
        }
      },
      output: {
        steps: [
          ['S0', {
            next: undefined,
            stepKey: 'S0',
            taskKeys: ['T0']
          }],
          ['S1', {
            next: undefined,
            stepKey: 'S1',
            taskKeys: ['T1']
          }],
          ['S2', {
            next: undefined,
            stepKey: 'S2',
            taskKeys: ['T2']
          }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes', next: 'S1' },
              { label: 'No', next: 'S2' }
            ]
          }),
          T1: DrawingTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' })
        }
      }
    },
    // T0 -> [T1, T2] or T4
    {
      name: 'single choice branching with a combo task',
      input: {
        first_task: 'T0',
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes', next: 'T4' },
              { label: 'No', next: 'T3' }
            ]
          }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' }),
          T3: {
            taskKey: 'T3',
            type: 'combo',
            tasks: ['T1', 'T2']
          },
          T4: DrawingTaskFactory.build({ taskKey: 'T4' })
        }
      },
      output: {
        steps: [
          ['S0', {
            next: undefined,
            stepKey: 'S0',
            taskKeys: ['T0']
          }],
          ['S1', {
            next: undefined,
            stepKey: 'S1',
            taskKeys: ['T1', 'T2']
          }],
          ['S2', {
            next: undefined,
            stepKey: 'S2',
            taskKeys: ['T4']
          }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            answers: [
              { label: 'Yes', next: 'S2' },
              { label: 'No', next: 'S1' }
            ]
          }),
          T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1' }),
          T2: MultipleChoiceTaskFactory.build({ taskKey: 'T2' }),
          T3: {
            taskKey: 'T3',
            type: 'combo',
            tasks: ['T1', 'T2']
          },
          T4: DrawingTaskFactory.build({ taskKey: 'T4' })
        }
      }
    }
  ]

  function runTestCase(testCase) {
    const { name, input, output } = testCase

    it(`should convert ${name}`, function () {
      const { steps, tasks } = convertWorkflowToUseSteps(input)
      expect({ steps, tasks }).to.deep.equal(output)
    })
  }
  testCases.forEach(runTestCase)
})