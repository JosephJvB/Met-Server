const Nightmare = require('nightmare')
const cheerio = require('cheerio')

const spookbot = Nightmare()
const METSERVICE_WELLY_URL = 'https://www.metservice.com/towns-cities/wellington/wellington-city'

/* Scrape engine, vroom vroom
    returns Object: {
      date: String,
      weather: String,
      maxTemp: String,
      minTemp: String
    } 
*/
module.exports = function nearlyHeadlessNicholas () {
  return spookbot
    .goto(METSERVICE_WELLY_URL)
    .wait(300) // can accept a css selector also but I will do with MS first
    .evaluate(() => document.body.innerHTML) // evaluate runs in headless-browser console
    .end()
    .then((response) => {
      const $ = cheerio.load(response)
      const todayElement = $('[class*="active today"]') // rely on this class to find today
      const todayTitle = $(todayElement).find('h3').text() === 'Today'
      // lil error handler: future proof your homes
      if(!todayTitle) {
        return console.error(line + '     OHSNAP' + line + '\nLooks like metservice has changed the DOM of their site. Please contact Joe asap.\n...Hey Joe, they changed the DOM.')
      }
      // util
      const getTodayTextData = function getTextByClassName(dataPoint) {
        const result = $(todayElement).find(`[class*="${dataPoint}"]`).text()
        // todo: check result exists/looks allg before returning. Exists&&type 'string' might be enough?
        return result
      }
    
      return {
        date: getTodayTextData('date'),
        weather: getTodayTextData('icon').toLowerCase(),
        maxTemp: getTodayTextData('high').split(' ')[0],
        minTemp: getTodayTextData('low').split(' ')[0]
      }
    })
}
