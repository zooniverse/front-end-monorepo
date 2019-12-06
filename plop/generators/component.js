module.exports = function (plop) {
  return {
    description: 'Bootstrap a new component',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name? (e.g. `Button`)'
      },
      {
        type: 'confirm',
        name: 'shouldCreateContainer',
        message: 'Create a container?'
      },
      {
        type: 'confirm',
        name: 'shouldUseMST',
        message: 'Connect the container to `mobx-state-tree`?',
        when: (answers) => answers.shouldCreateContainer
      }
    ],

    actions: function (answers) {
      const render = plop.renderString

      const data = {
        component: render('{{ properCase name }}', answers),
        shouldCreateContainer: answers.shouldCreateContainer,
      }

      data.path = render('{{ cwd }}/{{ component }}', data)

      data.entryPoint = data.shouldCreateContainer
        ? `${data.component}Container`
        : data.component

      let actions = [
        {
          type: 'add',
          templateFile: 'plop/templates/component/locales/en.json.hbs',
          path: render('{{ path }}/locales/en.json', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/Component.js.hbs',
          path: render('{{ path }}/{{ component }}.js', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/Component.spec.js.hbs',
          path: render('{{ path }}/{{ component }}.spec.js', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/index.js.hbs',
          path: render('{{ path }}/index.js', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/Stories.js.hbs',
          path: render('{{ path }}/{{ component }}.stories.js', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/Readme.md.hbs',
          path: render('{{ path }}/README.md', data),
          data
        }
      ]

      if (answers.shouldCreateContainer && !answers.shouldUseMST) {
        actions.push(
          {
            type: 'add',
            templateFile: 'plop/templates/component/Container.js.hbs',
            path: render('{{ path }}/{{ component }}Container.js', data),
            data
          },
          {
            type: 'add',
            templateFile: 'plop/templates/component/Container.spec.js.hbs',
            path: render('{{ path }}/{{ component }}Container.spec.js', data),
            data
          }
        )
      }

      if (answers.shouldCreateContainer && answers.shouldUseMST) {
        actions.push(
          {
            type: 'add',
            templateFile: 'plop/templates/component/MSTContainer.js.hbs',
            path: render('{{ path }}/{{ component }}Container.js', data),
            data
          },
          {
            type: 'add',
            templateFile: 'plop/templates/component/MSTContainer.spec.js.hbs',
            path: render('{{ path }}/{{ component }}Container.spec.js', data),
            data
          }
        )
      }

      return actions
    }
  }
}
