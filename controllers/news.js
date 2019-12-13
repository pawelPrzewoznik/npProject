// API query
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('f939c75d3fb04a0caaf5d41983cd8f75')

const en = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology']
const fr = ['Business', 'Divertissement', 'Sante', 'Science', 'Sports', 'Technologie']

exports.topEn = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'abc-news,abc-news-au,al-jazeera-english,associated-press,axios,bbc-news,cbc-news,cbs-news,cnn,independent,msnbc,nbc-news,news24,newsweek,new-york-magazine,politico,reuters,rte,the-globe-and-mail,the-hill,the-hindu,the-huffington-post,the-irish-times,the-jerusalem-post,the-new-york-times,the-times-of-india,the-wall-street-journal,the-washington-post,the-washington-times,time,usa-today,vice-news',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topFr = async (req, res, next) => {
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrBusiness = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'business',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrEnt = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'entertainment',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrSante = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'health',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrScience = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'science',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrSports = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'sports',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topFrTec = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    category: 'technology',
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
    return res.render('index', { headlines: headlines, lang: '', categories: fr })
  })
}

exports.topEnBusiness = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'australian-financial-review,bloomberg,business-insider,business-insider-uk,cnbc,financial-post,forturne,the-wall-street-journal',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topEnEnt = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'buzzfeed,entertainment-weekly,ign,mashable,mtv-news,mtv-news-uk,polygon,the-lad-bible',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topEnHealth = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'medical-news-today',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topEnScience = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'national-geographic,new-scientist',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topEnSports = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'bbc-sport,bleacher-report,espn,espn-cric-info,football-italia,four-four-two,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}

exports.topEnTec = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
    sources: 'ars-technica,crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired',
    language: 'en'
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
    return res.render('index', { headlines: headlines, lang: 'en/', categories: en })
  })
}
