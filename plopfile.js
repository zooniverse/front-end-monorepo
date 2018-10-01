module.exports = function (plop) {

    plop.setGenerator('App', {
      description: 'Bootstrap a new Next.js app',

      // inquirer prompts
      prompts: [{
        type: 'input',
        name: 'name',
        message: 'App name? (e.g. `projects`)'
      }],

      // actions to perform
      actions: [{
        type: 'add',
        path: 'packages/app-{{dashCase name}}',
        templateFile: 'templates/controller.hbs',
      }]
    });

  };
