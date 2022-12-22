import fs from 'fs';
import csv from 'csvtojson';

const booksReadStream = fs.createReadStream('./src/csv/books.csv');
const booksWriteStream = fs.createWriteStream('./src/csv/books.txt');

export function task2() {
  console.log('TASK1.2 started...\n');

  booksReadStream
    .on('error', (err: Error) => console.error('Error while ReadStream: ', err.message))
    .pipe(csv())
    .on('error', (err: Error) => {
      console.error('Error while reading CSV: ', err.message);
    })
    .on('data', (chunk) => {
      console.log('CSV Line: ', chunk.toString());
    })
    .pipe(booksWriteStream)
    .on('error', (err: Error) => {
      console.error('Error while WriteStream: ', err.message);
    })
    .on('close', () => {
      console.log('TASK1.2 finished!\n');
    });
}

task2();
