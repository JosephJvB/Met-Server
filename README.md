<h1 align="center">Met-Server</h1>

_Met-Server is an api-endpoint that returns weather data as JSON that has been scraped from `metservice.com`_

End-points
===========
- Wellingon Weather
  - GET: `https://met-server.herokuapp.com/wgtn`
  - returns: JSON (eg below)
  ```json
  {
    "date": "Dec 25",
    "weather": "sunny",
    "maxTemp": "21˚C",
    "maxTemp": "14˚C",
  }
  ```

## Why?
- From 5 minutes searching the web I didn't find a metservice API. So I wanted to roll my own.
- I like scraping. The web has many things, we can access these things programmatically.
- I like the request/response pattern. Async is javascript at its best.
- I absolutely love weather chat.

## How?
- Met-Server is a **node.js** webserver hosted on **Heroku** that responds to GET requests with JSON.

- Met-Server uses **Nightmare.js**(headless browser) to scrape the Metservice website. **Cheerio.js** to parse the response html and **Pg-promise** to store the latest weather data in a **Postgres** database.

- The headless browser script is triggered regularly by a chron-job to ensure that the data that is stored and served by the endpoint is up-to-date.