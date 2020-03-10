const axios = require("axios");
const querystring = require("querystring");
const { google } = require("googleapis");

const createController = require("../createController");

// Udemy arguments
const udemyClientId = process.env.UDEMY_CLIENT_ID || "";
const udemyClientSecret = process.env.UDEMY_CLIENT_SECRET || "";
const udemyAuthKey = Buffer.from(
  `${udemyClientId}:${udemyClientSecret}`
).toString("base64");
const udemyBaseUrl = "https://www.udemy.com/api-2.0";
const http = axios.create({
  headers: {
    Authorization: `Basic ${udemyAuthKey}`
  }
});

// Youtube arguments
const services = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY
});

module.exports = {
  udemy: createController(async (req, res, next) => {
    const fields = [
      "search",
      "price",
      "category",
      "subcategory",
      "ratings",
      "language",
      "has_coding_exercises",
      "instructional_level",
      "ordering"
    ];
    const params = {};
    for (const field of fields) {
      if (req.query[field]) params[field] = req.query[field];
    }
    const stringParams = querystring.stringify(params);
    const response = await http.get(
      `${udemyBaseUrl}/courses?${stringParams}&fields[course]=@default,avg_rating`
    );
    const data = response.data;
    if (!data) throw new Error("No data present");

    res.json({ courses: data.results });
  }),

  youtube: createController(async (req, res) => {
    const { query } = req.query;
    try {
      const searchResults = await services.search.list({
        maxResults: 50,
        q: query,
        part: "snippet"
      });
      res.status(200).send(searchResults.data);
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  })
};
