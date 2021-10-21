const axios = require('axios');

exports.handler = async function (event, context) {

  const API_KEY =  process.env.REACT_API_KEY;
  const city = event.queryStringParameters.city;

  let uri = "https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&key=" + API_KEY +"&maxResults=40";

  const { data } = await axios.get(uri);

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }

}
