
const inquirer = require('inquirer')

function ask (prompts) {
  return Promise.all(prompts.map(item => {
    return new Promise((resolve, reject) => {
      resolve(prompt(item))
    })
  }))
}

function prompt (prompts) {
  return Promise.all(prompts.map(item => {
    return new Promise((resolve, reject) => {
      inquirer.prompt([{
        type: item.type,
        name: item.name,
        message: item.message || item.name,
        default: item.default,
        choices: item.choices || [],
        validate: item.validate || (() => true)
      }]).then(answers => {
        resolve(answers)
        // if (Array.isArray(answers[key])) {
        //   data[key] = {}
        //   answers[key].forEach(multiChoiceAnswer => {
        //     data[key][multiChoiceAnswer] = true
        //   })
        // } else if (typeof answers[key] === 'string') {
        //   data[key] = answers[key].replace(/"/g, '\\"')
        // } else {
        //   data[key] = answers[key]
        // }
        // done()
      })
    })
  }))
}

module.exports = prompt