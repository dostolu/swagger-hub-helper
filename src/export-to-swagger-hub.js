#!/usr/bin/env node
const request = require('request');
const fs = require('fs');

const packageJson = require(`${__dirname}/package.json`);

try {
  const api = fs.readFileSync(`${__dirname}./apiDocs/swagger.yaml`);
  const apiName = process.env.SWAGGERHUB_API_NAME || 'dostolu.online';
  const apiKey = process.env.SWAGGERHUB_API_KEY;

  request({
    method: 'POST',
    url: `https://api.swaggerhub.com/apis/${apiName}/${packageJson.name}?isPrivate=true&version=${packageJson.version}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/yaml',
      Authorization: apiKey
    },
    body: api
  }, (error, response) => {
    if (!error && response.statusCode < 400) {
      console.log('Exported');
    } else {
      console.log(error);
    }
  });
} catch (e) {
  console.log('No file');
}
