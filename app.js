const { spawn } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express/lib/response');

const interactshClientPath = "interactsh-client"

const subProcess = spawn(interactshClientPath);
const app = express();

app.use(bodyParser.json());

let url = '', accumulatedData = '';
const interactionArr = [];

let acc = {};
subProcess.stdout.on('data', (data) => {
  // console.log(`stdout:\n${data}`);

  let x = data.toString();
  const logLines = x.split('\n');

  
  const interactionsObject={};

  logLines.forEach((line) => {
    const match = line.match(/\[.*\] Received (.*) from .* at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
    // console.log(match);
    if (match) {
      const interaction = match[0];
      const timestamp = match[2];
      interactionsObject[timestamp] = interaction;
      interactionArr.push(interactionsObject);
    }
  });

});

subProcess.stderr.on('data', (data) => {
  const chunk = data.toString();
  console.log("start", chunk, "end");

  let x = chunk.split(' ')

  url = x[x.length - 1];

  url = url.slice(0, -1)


});


subProcess.on('error', (error) => {
  console.error(`error: ${error.message}`);
});
subProcess.on('close', (code) => {
  console.log(`child process salida ${code}`);
});
app.get('/api/getURL', (req, res) => {
  res.json({ url })
})


app.post('/api/getInteractions', (req, res) => {
  const { url, start, end } = req.body;

  let filteredInteractions = [...interactionArr];


  if (start && end) {
    // Filter by start and end timestamps
    filteredInteractions = filteredInteractions.filter(interaction => {
      console.log(interaction);
      const timestamp = Object.keys(interaction)[0];
      return timestamp >= start && timestamp <= end;
    });
  } else if (start) {
    // Filter by start timestamp only
    filteredInteractions = filteredInteractions.filter(interaction => {
      const timestamp = Object.keys(interaction)[0];
      return timestamp >= start;
    });
  } else if (end) {
    // Filter by end timestamp only
    filteredInteractions = filteredInteractions.filter(interaction => {
      const timestamp = Object.keys(interaction)[0];
      return timestamp <= end;
    });
  }

  res.json(filteredInteractions);
});


const port = 3000;
app.listen(port, () => {
  console.log(`running on ${port}`)
})

