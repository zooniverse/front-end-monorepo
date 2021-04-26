import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

describe.only('workflow with invalid dropdown task', function () {
  let store

  before(function () {
    const workflow = WorkflowFactory.build({
      tasks: {
        "T0": {
          "help": "",
          "type": "dropdown",
          "selects": [
            {
              "id": "c0a8efe878208",
              "title": "Main Dropdown",
              "options": {
                "*": [
                  {
                    "label": "one",
                    "value": "3a5e7c30a1f81"
                  },
                  {
                    "label": "two",
                    "value": "ecc0e62c6c11"
                  },
                  {
                    "label": "three",
                    "value": "57ca0302a9e4d"
                  },
                  {
                    "label": "four",
                    "value": "f8a9fcd7c6cc6"
                  }
                ]
              },
              "required": true,
              "allowCreate": false
            },
            {
              "id": "1de4d3316327f",
              "title": "text entry",
              "options": {},
              "required": false,
              "condition": "c0a8efe878208",
              "allowCreate": true
            }
          ],
          "instruction": "Select with multiple menus"
        },
        "T1": {
          "help": "",
          "type": "dropdown",
          "selects": [
            {
              "id": "a7ceda8fea5de",
              "title": "Main Dropdown",
              "options": {
                "*": [
                  {
                    "label": "one",
                    "value": "252dd4aa6963f"
                  },
                  {
                    "label": "two",
                    "value": "4f26fd9b8b658"
                  },
                  {
                    "label": "three",
                    "value": "cb62c942d3aac"
                  },
                  {
                    "label": "four",
                    "value": "921eba2cb599c"
                  },
                  {
                    "label": "five",
                    "value": "5820ac02b9e7e"
                  }
                ]
              },
              "required": true,
              "allowCreate": false
            }
          ],
          "instruction": "Select from a single menu"
        },
        "T2": {
          "type": "combo",
          "tasks": [
            "T1",
            "T0"
          ]
        }
      }
    })
    store = mockStore(workflow)
  })

  describe('the workflow', function () {
    let workflow

    before(function () {
      workflow = store.workflows.active
    })

    it('should have one step', function () {
      expect(workflow.steps.length).to.equal(1)
    })

    it('should have 3 tasks', function () {
      const tasks = Object.values(workflow.tasks)
      expect(tasks.length).to.equal(3)
    })

    it('should have 2 dropdown tasks', function () {
      const tasks = Object.values(workflow.tasks)
      const dropdowns = tasks.filter(task => task.type === 'dropdown')
      expect(dropdowns.length).to.equal(2)
    })
  })

  describe('workflow steps', function () {
    it('should have one step', function () {
      expect(store.workflowSteps.steps.size).to.equal(1)
    })

    it('should have one dropdown simple task', function () {
      const step = store.workflowSteps.active
      expect(step.tasks.length).to.equal(1)
      const [ task ] = step.tasks
      expect(task.type).to.equal('dropdown-simple')
    })
  })

  describe('the active classification', function () {
    let classification

    before(function () {
      classification = store.classifications.active
    })

    it('should have one annotation', function () {
      expect(classification.annotations.size).to.equal(1)
    })

    it('should have a dropdown-simple annotation for task T1', function () {
      const annotation = classification.annotation({ taskKey: 'T1' })
      expect(annotation.taskType).to.equal('dropdown-simple') 
    })

    it('should not have a dropdown annotation for task T0', function () {
      const annotation = classification.annotation({ taskKey: 'T0' })
      expect(annotation).to.be.undefined()
    })
  })
})