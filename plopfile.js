module.exports = function (plop) {
  plop.setGenerator('App', {
    description: 'Bootstrap a new Next.js app',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'App name? (e.g. `projects`)'
      }
    ],

    actions: [
      {
        type: 'addMany',
        templateFiles: ['plop/app/**/*', 'plop/app/**/.*'],
        destination: 'packages/app-{{dashCase name}}',
        base: 'plop/app'
      }
    ]
  })
}
