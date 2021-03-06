const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');
const Table = require('cli-table');

const { getError } = require('../utils');
const { HOST } = require('../settings');

const streamkit = require('../streamkit');

module.exports = (args) => {
  const spinner = ora('Listing your streams').start();

  streamkit
    .getStreams()
    .then(success => {
      spinner.succeed();

      success.data.streams.forEach(stream => {
        const createdAt = new Date(stream.createdAt);
        const table = new Table();
        
        table.push({ 'Stream' :  stream.name },
                   { 'URL' : `${HOST}/events?stream=${stream.name}` },
                   { 'Endpoint': stream.endpoint });
        
        console.log(table.toString());
      });
    })
    .catch(error => {
      spinner.fail(chalk.red(getError(error)));
    });
}
