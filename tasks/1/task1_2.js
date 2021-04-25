var fs = require('fs');
var { pipeline } = require('stream');
var csv = require('csvtojson');

var csvToJsonParameters = {
    delimiter: 'auto',
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    ignoreColumns: /(amount)/,
    colParser: {
      "price": item => parseFloat(item.replace(',', '.')),
    },
  },
  csvPath = './public/nodejs-hw1-ex1.csv',
  resultRAMPath = './public/convertedFromRAM.txt',
  resultPath = './public/converted.txt';

/* From RAM */
fs.readFile(csvPath, 'utf8', function (err, data) {
  if (err) {
    return console.error('Error while reading: ', err);
  }

  try {
    fs.unlinkSync(resultRAMPath)
  } catch (err) {}

  csv(csvToJsonParameters)
    .fromString(data)
    .subscribe(function (jsonStr) {
      var jsonString = JSON.stringify(jsonStr) + '\n';
      fs.writeFile(resultRAMPath, jsonString, {
        'flag': 'a'
      }, function (err) {
        if (err) {
          return console.error('Error while writing: ', err);
        }
      });
    });
  console.log('Success. Please check output in file "' + resultRAMPath + '"');
});

/* Pipeline method */
pipeline(
  fs.createReadStream(csvPath),
  csv(csvToJsonParameters),
  fs.createWriteStream(resultPath),
  function (err) {
    if (err) {
      return console.error('Pipeline failed', err);
    }

    console.log('Pipeline succeeded.  Please check output in file "' + resultPath + '"');
  }
);
