const pgp = require('pg-promise')()

const PG_CONFIG = process.env.DATABASE_URL
  ? process.env.DATABASE_URL // provided by heroku config var
  : {
		host: 'localhost',
		port: 5432,
		database: 'metserver_dev',
		user: 'postgres',
		password: 'postgres'
  }
  
const dbConnection = pgp(PG_CONFIG)

module.exports = {
  gimmeWellyWeather: function getLatestWgtnWeather () {
    // get me the latest entry - one item with highest id
    return dbConnection.one('select * from wgtn_weather order by id desc limit 1')
      .then(latest => ({
        date: latest.date.trim(), // have lots of white-space? i dunno
        desc: latest.description.trim(),
        maxTemp: latest.max_temp.trim(),
        minTemp: latest.min_temp.trim(),
        timestamp: latest.timestamp.trim()
      }))
      .catch(err => {
        console.error('\n\nPG-P SELECT error\n\n\n', err)
        throw err
      })
  },
  saveWellyWeather: function insertScrapedData (scrapedDataString) {
    return dbConnection.none(
      `insert into wgtn_weather (date,description,max_temp,min_temp,timestamp) values (${scrapedDataString})`
    )
    .catch(err => {
      console.error('\n\nPG-P INSERT error\n\n\n', err)
      throw err
    })
  }
}

module.exports.DB_CONN = dbConnection
