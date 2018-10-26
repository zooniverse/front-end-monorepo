module.exports = function (plop) {
  return {
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
        templateFiles: ['plop/templates/app/**/*'],
        globOptions: {
          dot: true
        },
        destination: 'packages/app-{{ dashCase name }}',
        base: 'plop/templates/app'
      }
    ]
  }
}
