
const prompt = require('./prompt')

const promptsConfig = [
  {
    type: 'input',
    name: 'name',
    message: '您的用户名',
    default: 'jelewine',
  }
]

function register() {
  prompt(promptsConfig)
  .then(answers => {
    console.log(answers)
  })
}

module.exports = register
