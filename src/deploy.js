
const fs = require('fs')
const client = require('scp2')
const userHome = require('user-home')
const ora = require('ora')

const logger = require('./logger')
const { existanceCheck } = require('./utils')

function deploy(config) {
  existanceCheck(['host', 'user', 'pwd', 'localpath', 'targetpath'])(config)
    ? undefined
    : logger.fatal('Config Parameter deletion!! Please confirm that you have registered. \n')

  const spinner = ora('deploying the payload')
  spinner.start()
  client.scp(config.localpath, {
    host: config.host,
    username: config.user,
    password: config.pwd,
    path: config.targetpath
  }, err => {
    spinner.stop()
    if (err) logger.fatal(`${err} \n`)
    logger.success(`Payload was deployed successfully!! \n`)
  })
}

module.exports = deploy