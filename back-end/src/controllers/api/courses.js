const axios = require('axios');
const querystring = require('querystring');
const search = require('youtube-search');

const createController = require('../createController');

// Udemy arguments
const udemyClientId = process.env.UDEMY_CLIENT_ID || '';
const udemyClientSecret = process.env.UDEMY_CLIENT_SECRET || '';
const udemyAuthKey = Buffer.from(
  `${udemyClientId}:${udemyClientSecret}`,
).toString('base64');
const udemyBaseUrl = 'https://www.udemy.com/api-2.0';
const http = axios.create({
  headers: {
    Authorization: `Basic ${udemyAuthKey}`,
  },
});

// Youtube arguments
var opts = {
  maxResults: 10,
  key: process.env.YOUTUBE_API_KEY,
};

module.exports = {
  udemy: createController(async (req, res, next) => {
    const fields = [
      'search',
      'price',
      'category',
      'subcategory',
      'ratings',
      'language',
      'has_coding_exercises',
      'instructional_level',
      'ordering',
    ];
    const params = {};
    for (const field of fields) {
      if (req.query[field]) params[field] = req.query[field];
    }
    const stringParams = querystring.stringify(params);
    const response = await http.get(
      `${udemyBaseUrl}/courses?${stringParams}&fields[course]=@default,avg_rating`,
    );
    const data = response.data;
    if (!data) throw new Error('No data present');

    res.json({ courses: data.results });
  }),

  youtube: (req, res) => {
    const { query } = req.query;
    search(query, opts, function(err, results) {
      if (err) return res.send(err.response.data);
      res.status(200).send({ results });
    });
  },
};
