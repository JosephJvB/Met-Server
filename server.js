const express = require('express')
const api = express()
const bodyParser = require('body-parser')


const dbService = require('./db-service')
const TO_THIS = process.env.PORT || 3000

api.use(bodyParser.text())

api.get('/api/v1/wgtn', (req, res) => {
  return dbService.gimmeWellyWeather()
    .then(weather => res.send(weather))
    .catch(err => {
      console.error('X-Press GET error \n\n\n', err)
      return res.sendStatus(500)
    })
})

// maybe include process.env.UUID so people cant post to my url
// or some other way? I wonder what best practise is.
api.post('/api/v1/save_scrape_data', (req, res) => {
  return dbService.saveWellyWeather(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error('X-Press POST error \n\n\n', err)
      return res.sendStatus(500)
    })
})

api.listen(TO_THIS, () => console.log('Oh damn, that\'s my jam!'))