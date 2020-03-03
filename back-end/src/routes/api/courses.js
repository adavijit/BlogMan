const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');

const udemyClientId = process.env.UDEMY_CLIENT_ID || '';
const udemyClientSecret = process.env.UDEMY_CLIENT_SECRET || '';
const udemyAuthKey = Buffer.from(
  `${udemyClientId}:${udemyClientSecret}`,
).toString('base64');
const baseUrl = 'https://www.udemy.com/api-2.0';
const http = axios.create({
  headers: {
    Authorization: `Basic ${udemyAuthKey}`,
  },
});

router.get('/udemy', async (req, res, next) => {
  try {
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
      `${baseUrl}/courses?${stringParams}&fields[course]=@default,avg_rating`,
    );
    const data = response.data;
    if (!data) throw new Error('No data present');

    res.json({ courses: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
