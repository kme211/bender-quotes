const fs = require('fs');
const logger = require('./logger');
const path = require('path');
const recursive = require('recursive-readdir');

const source = 'src';
const destination = 'dist';

logger.log('Copying index.html to dist...');

const files = ['index.html', 'manifest.json', 'browserconfig.xml'];

files.forEach(file => {
  fs.readFile(`${source}/${file}`, (err, data) => {
    if (err) return logger.error(err);
    fs.writeFile(`${destination}/${file}`, data, (err) => {
      if (err) return logger.error(err);
      logger.log(`Copied ${source}/${file} to ${destination}/${file}`);
    });
  });
})



recursive(`${source}/icons`, function(err, icons) {
  icons.forEach(icon => {
    fs.readFile(icon, (err, data) => {
      if (err) return logger.error(err);
      fs.writeFile(`${destination}/${icon.split('/').slice(-1)}`, data, (err) => {
        if (err) return logger.error(err);
        logger.log(`Copied ${icon} to ${destination}/${icon}`);
      });
    });
  });
});