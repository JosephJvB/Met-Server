const api = require('express')()
const dbService = require('./db-service')

const TO_THIS = process.env.PORT || 3000

api.get('/wgtn', (req, res) => {
  return dbService.gimmeWellyWeather()
    .then(weather => res.send(weather))
    .catch(err => {
      console.error('X-Press error \n\n\n', err)
      return res.sendStatus(500)
    })
})

api.listen(TO_THIS, () => console.log('Oh damn, that\'s my jam!'))