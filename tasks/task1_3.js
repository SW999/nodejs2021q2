import * as fs from 'fs';
import { pipeline } from 'stream';
import { csv } from "csvtojson";

const csvToJsonParameters = {
  delimiter: 'auto',
  noheader: false,
  headers: ['book', 'author', 'amount', 'price'],
  ignoreColumns: /(amount)/,
  colParser: {
    "price": item => parseFloat(item.replace(',', '.')),
  },
};
const csvPath = './public/nodejs-hw1-ex1.csv';
const resultRAMPath = './public/convertedFromRAM.txt';
const resultPath = './public/converted.txt';

/* From RAM */
fs.readFile(csvPath, 'utf8', (err, data) => {
  if (err) {
    return console.error('Error while reading: ', err);
  }

  try {
    fs.unlinkSync(resultRAMPath)
  } catch (err) {}

  csv(csvToJsonParameters)
    .fromString(data)
    .subscribe((jsonStr) => {
      fs.writeFile(resultRAMPath, `${JSON.stringify(jsonStr)}\n`, {
        'flag': 'a'
      }, (err) => {
        if (err) {
          return console.error('Error while writing: ', err);
        }
      });
    });
  console.log(`Success. Please check output in file "${resultRAMPath}"`);
});

/* Pipeline method */
pipeline(
  fs.createReadStream(csvPath),
  csv(csvToJsonParameters),
  fs.createWriteStream(resultPath),
  (err) => {
    if (err) {
      return console.error('Pipeline failed', err);
    }

    console.log(`Pipeline succeeded. Please check output in file "${resultPath}"`);
  }
);

