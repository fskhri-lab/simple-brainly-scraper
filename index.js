const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBrainlySearch(query) {
  const response = await axios.get(`https://brainly.com/question/${query}`);
  const html = response.data;
  const $ = cheerio.load(html);
  const results = [];
  
  // Get questions and answers from search results
  $('.js-search-results .sg-text.sg-text--break-words').each((i, element) => {
    const question = $(element).find('.sg-text.sg-text--bold').text().trim();
    const answer = $(element).find('.sg-text.sg-text--break-words').text().trim();
    results.push({ question, answer });
  });
  
  return results;
}

// Example usage
scrapeBrainlySearch('nama ibu kota indonesia?')
  .then(results => console.log(results))
  .catch(err => console.error(err));
