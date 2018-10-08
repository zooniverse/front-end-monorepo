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
    ],

    actions: function (answers) {
      const render = plop.renderString

      const data = {
        component: render('{{ properCase name }}', answers),
        container: render('{{ properCase name }}Container', answers),
        shouldCreateContainer: answers.shouldCreateContainer,
      }
      data.path = render('{{ cwd }}/{{ component }}', data)
      data.entryPoint = data.shouldCreateContainer ? data.container : data.component

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
          templateFile: 'plop/templates/component/Test.js.hbs',
          path: render('{{ path }}/{{ component }}.spec.js', data),
          data
        },
        {
          type: 'add',
          templateFile: 'plop/templates/component/index.js.hbs',
          path: render('{{ path }}/index.js', data),
          data
        }
      ]

      if (answers.shouldCreateContainer) {
        actions.push(
          {
            type: 'add',
            templateFile: 'plop/templates/component/Container.js.hbs',
            path: render('{{ path }}/{{ container }}.js', data),
            data
          },
          {
            type: 'add',
            templateFile: 'plop/templates/component/Test.js.hbs',
            path: render('{{ path }}/{{ container }}.spec.js', data),
            data
          }
        )
      }

      return actions
    }
  }
}
