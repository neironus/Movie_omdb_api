const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const request = require("request")
const port = 3000
const APIkey = 'YourApiKey'
const url = `http://omdbapi.com/?apikey=${APIkey}&s=`

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("search")
})

app.get("/results", (req, res) => {
  let query = req.query.search
  request(url + query, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let results = JSON.parse(body)
      // console.log(results.Search[0]);
      res.render('results', {
        results: results
      })
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
