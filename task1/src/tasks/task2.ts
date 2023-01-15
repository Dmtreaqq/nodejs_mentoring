import fs from 'fs';
import csv from 'csvtojson';

const convertCSVToJSON = (readPath: string, writePath: string) => {
  console.log('TASK1.2 started...\n');
  const booksReadStream = fs.createReadStream(readPath);
  const booksWriteStream = fs.createWriteStream(writePath);

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
};

const READ_PATH = './src/csv/books.csv';
const WRITE_PATH = './src/csv/books.txt';

convertCSVToJSON(READ_PATH, WRITE_PATH);
