const pgp = require('pg-promise')()

const { PG_CONFIG } = require('./config')
  
const dbConnection = pgp(PG_CONFIG)

// export db action-functions
module.exports = {
  gimmeWellyWeather: function getLatestWgtnWeather () {
    // get me the latest entry - one item with highest id
    return dbConnection.one('select * from wgtn_weather order by id desc limit 1')
      .then(latest => ({
        date: latest.date.trim(), // have lots of white-space? i dunno
        desc: latest.description.trim(),
        maxTemp: latest.max_temp.trim(),
        minTemp: latest.min_temp.trim(),
        timestamp: latest.timestamp.trim(),
        rainData: latest.rain_data.trim()
      }))
      .catch(err => {
        console.error('\n\nPG-P SELECT error\n\n\n', err)
        throw err
      })
  },
  saveWellyWeather: function insertScrapedData (scrapedDataString) {
    // const columnstring = 'date,description,max_temp,min_temp,timestamp,rain_data'
    // should set columnstring in a default place so migration script and this use the same var
    return dbConnection.none(
      `insert into wgtn_weather (date,description,max_temp,min_temp,timestamp,rain_data) values (${scrapedDataString})`
    )
    .catch(err => {
      console.error('\n\nPG-P INSERT error\n\n\n', err)
      throw err
    })
  }
}
// export connection for use in migrations script
module.exports.DB_CONN = dbConnection
