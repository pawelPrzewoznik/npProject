// API query
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('f939c75d3fb04a0caaf5d41983cd8f75')

const en = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology']
const fr = ['Business', 'Divertissement', 'Sante', 'Science', 'Sports', 'Technologie']

exports.topEn = async (req, res, next) => {
  var headlines = []
  await newsapi.v2.topHeadlines({
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
    category: 'business',
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
    category: 'entertainment',
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
    category: 'health',
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
    category: 'science',
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
    category: 'sports',
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
    category: 'technology',
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
