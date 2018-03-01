
const fs = require('fs')
const logger = require('./logger')
const Client = require('ssh2').Client
const userHome = require('user-home')

function deploy (config) {
  let connection = new Client()

  connection.on('ready', () => {
    logger.success('Client :: ready')

    connection.exec('uptime', (err, stream) => {
      if (err) {
        logger.fatal(err)
      }
      stream
        .on('close', (code, signal) => {
          logger.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
          connection.end()
        })
        .on('data', data => {
          logger.log('STDOUT: ' + data)
        })
        .stderr.on('data', data => {
          logger.fatal(`STDERR: ${data}`)
        })
    })
  })
  // fs.readFile(`${userHome}/.ssh/id_rsa`, (err, data) => {
  //   console.log(data)
    // if (err) {
    //   console.log(err)
    // } else {
    //   exec('ls -lh', {
    //     user: 'root',
    //     host: '47.104.67.150',
    //     key: data,
    //     password: '1995815@jly'
    //   }).pipe(process.stdout)
    // }
  // })
}

module.exports = deploy