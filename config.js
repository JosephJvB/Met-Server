module.exports = {
  // used in ./db-service
  PG_CONFIG: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
      host: 'localhost',
      port: 5432,
      database: 'metserver_dev',
      user: 'postgres',
      password: 'postgres'
    },
  // used in ./server
  UUID: process.env.UU_EYE_DEE || 'local',
  // used in ./.bin/scrape
  SAVE_DATA_URL: process.env.UU_EYE_DEE ? `https://met-server-nz.herokuapp.com/api/v1/${process.env.UU_EYE_DEE}/save_scrape_data` : 'http://localhost:3000/api/v1/local/save_scrape_data',
  // used in ./.bin/scrape && ./db-service
  DB_SCHEMA_STRING: 'id serial primary key,date char(255),description char(255),max_temp char(255),min_temp char(255),timestamp char(255),rain_data char(255)'
}