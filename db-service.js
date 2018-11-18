const pgp = require('pg-promise')()

const PG_CONFIG = process.env.PORT
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
  gimmeWellyWeather: function () {
    // get me the latest entry - one item with highest id
    return dbConnection.one('select * from wgtn_weather order by id desc limit 1')
      .then(latest => ({
        date: latest.date,
        desc: latest.description,
        maxTemp: latest.max_temp,
        minTemp: latest.min_temp
      }))
      .catch(err => {
        console.error('\n\nPG-P error\n\n\n', err)
        throw err
      })
  }
}