const readStdinStream = process.stdin;
const writeStdoutStream = process.stdout;

export function reverseStringFromStdin(str: string): string {
  const stringWithoutCRLF = str.slice(0, str.length - 2);
  const CRLF = str.slice(-2);
  const reversedString = stringWithoutCRLF.split('').reverse().join('');

  return `${reversedString}${CRLF}`;
}

export function task1() {
  console.log('TASK1.1 started...\n');

  readStdinStream
    .on('error', (err: Error) => {
      console.error(err.message);
    })
    .on('data', (data: string) => {
      writeStdoutStream.write(reverseStringFromStdin(`${data.toString()}\n`));
    });
}

process.on('SIGINT', function () {
  console.log('Pressed CTRL+C to exit program, TASK1.1 finished!');
  process.exit();
});

task1();
