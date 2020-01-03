// API query
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.API_KEY)

const en = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology']
const fr = ['Business', 'Divertissement', 'Sante', 'Science', 'Sports', 'Technologie']

exports.topEn = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news(
    'abc-news,abc-news-au,al-jazeera-english,associated-press,axios,bbc-news,cbc-news,cbs-news,cnn,independent,msnbc,nbc-news,news24,newsweek,new-york-magazine,politico,reuters,rte,the-globe-and-mail,the-hill,the-hindu,the-huffington-post,the-irish-times,the-jerusalem-post,the-new-york-times,the-times-of-india,the-wall-street-journal,the-washington-post,the-washington-times,time,usa-today,vice-news',
    'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topFr = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = []
  await newsapi.v2.topHeadlines({
    language: 'fr'
  }).then(response => {
  // Articles params => source, author, title, description, url, urlToImage, publishedAt, content
    for (var variable in response.articles) {
      headlines.push({
        title: response.articles[variable].title,
        description: response.articles[variable].description,
        url: response.articles[variable].url,
        urlToImage: response.articles[variable].urlToImage
      })
    }
    return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
  })
}

exports.topFrBusiness = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('business', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topFrEnt = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('entertainment', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topFrSante = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('health', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topFrScience = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('science', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topFrSports = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('sports', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topFrTec = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await newsFr('technology', 'fr')

  return res.render('index', { headlines: headlines, lang: '', categories: fr, connected: isConnected })
}

exports.topEnBusiness = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news('australian-financial-review,bloomberg,business-insider,business-insider-uk,cnbc,financial-post,forturne,the-wall-street-journal', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topEnEnt = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news('buzzfeed,entertainment-weekly,ign,mashable,mtv-news,mtv-news-uk,polygon,the-lad-bible', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topEnHealth = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news('medical-news-today', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topEnScience = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news('national-geographic,new-scientist', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topEnSports = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }
  var headlines = await news('bbc-sport,bleacher-report,espn,espn-cric-info,football-italia,four-four-two,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

exports.topEnTec = async (req, res, next) => {
  var isConnected = false
  if (req.session.user_id) {
    isConnected = true
  }

  var headlines = await news('ars-technica,crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired', 'en')

  return res.render('index', { headlines: headlines, lang: 'en/', categories: en, connected: isConnected })
}

async function news (sources, lang) {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: sources,
    language: lang
  }).then(response => {
    for (var variable in response.articles) {
      headlines.push({
        // Articles params => source, author, title, description, url, urlToImage, publishedAt, content
        title: response.articles[variable].title,
        description: response.articles[variable].description,
        url: response.articles[variable].url,
        urlToImage: response.articles[variable].urlToImage
      })
    }
  })
  return headlines
}

async function newsFr (category, country) {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: category,
    country: country
  }).then(response => {
    for (var variable in response.articles) {
      headlines.push({
        // Articles params => source, author, title, description, url, urlToImage, publishedAt, content
        title: response.articles[variable].title,
        description: response.articles[variable].description,
        url: response.articles[variable].url,
        urlToImage: response.articles[variable].urlToImage
      })
    }
  })
  return headlines
}
