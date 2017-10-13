const SerialPort = require('serialport');
const delay = require('bluebird').delay;

async function test() {
  const ports = await SerialPort.list();
  const arduino = ports.find(port => {
    return typeof port.manufacturer === 'string' && port.manufacturer.includes('Arduino');
  });

  if (!arduino) {
    throw new Error('No arduino port found');
  }

  const port = new SerialPort(arduino.comName, { autoOpen: false, baudRate: 250000 });
  const Readline = SerialPort.parsers.Readline;
  const parser = port.pipe(new Readline({ delimiter: '\n' }));

  parser.on('data', data => { console.log(data.toString()); });
  port.open(async () => {
    await delay(2000);
    port.write('Hello\n');
    console.log('Just wrote "Hello"');
    await delay(2000);
    port.write('World\n');
    console.log('Just wrote "World"');
  });
}

test();
