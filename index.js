const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require(__dirname + '/helpers');
const app = new express();
const hbs = exphbs.create(helpers);
const defaultConfigFile = require(__dirname + '/config/index.json');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const botPreview = function() {
  const defaultConfiguration = {
    flowsDirectory: __dirname + '/flows',
    defaultFlow: 'test.txt',
    configFile: __dirname + '/config/index.json',
    port: 4000,
  };

  this.start = (configuration) => {
    const config = Object.assign(defaultConfiguration, configuration);
    app.use('/:flow?', (req, res) => {
      try {
        const configFile = require(config.configFile);
        const name = req.params.flow || config.defaultFlow;
        const botConfig = Object.assign(defaultConfigFile, configFile);
        const flowList = fs.readdirSync(config.flowsDirectory);
        const flow = fs.readFileSync(`${config.flowsDirectory}/${name}`, 'utf8');
        const flowActions = flow.split('\n');
        res.render('main.hbs', {
          flow: flowActions,
          flowList: flowList,
          name: name,
          config: JSON.stringify(botConfig),
        });
      } catch(error) {
        res.send(null);
      }
    });

    app.listen(config.port, () => {
      console.log(`Bot Preview start on port ${config.port}`);
    });
  };
}

module.exports = new botPreview();
