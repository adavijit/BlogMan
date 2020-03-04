
const router = require("express").Router();
const request = require('request');

router.post("/getBooks", async (req, res) => {
    const query = req.body.bookQuery.split(/\s*\s/).join("+");
  
    request("https://www.googleapis.com/books/v1/volumes?q=" + query, {json: true}, (err, response, body) => {
      if(err) { return console.log(err); }
      return res.json(response);
    });
});

module.exports = router;