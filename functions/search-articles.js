import fetch from 'node-fetch';

const API_ENDPOINT = 'https://api.github.com/search/code?q=in:file+language:md+repo:jacob-ebey/foxesnfriends-gatsby+Trump';

exports.handler = async () => fetch(API_ENDPOINT, {
  headers: {
    Accept: 'application/json',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})
  .then((response) => response.json())
  .then((data) => ({
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  }))
  .catch((error) => ({
    statusCode: 422,
    headers: { 'content-type': 'application/json' },
    body: String(error),
  }));
