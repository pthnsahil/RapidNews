const axios=require('axios')
const cheerio = require('cheerio');
const newsUrls = {
    "TV9 GUJARATI": "https://tv9gujarati.com/",
    "BBC GUJARATI": "https://www.bbc.com/gujarati",
    "ABP ASMITA": "https://gujarati.abplive.com/",
    "INDIAN EXPRESS GUJARATI": "https://gujarati.indianexpress.com/"
  };

async function scrapeHeadlines() {
    const headlines = {
      "TV9 GUJARATI": [],
      "BBC GUJARATI": [],
      "ABP ASMITA": [],
      "INDIAN EXPRESS GUJARATI": []
    };
  
    for (let source in newsUrls) {
      try {
        const response = await axios.get(newsUrls[source]);
        const $ = cheerio.load(response.data);
  
        let count = 0;
        switch (source) {
          case "TV9 GUJARATI":
            $('.card_title h3').each((element) => {
              if (count < 9) {
                const headline = $(element).text().trim();
                headlines[source].push(headline);
               
                count++;
              }
            });
            break;
          case "BBC GUJARATI":
            
            $('.promo-text h3').each((element) => {
              if (count < 9) {
                const headline = $(element).text().trim();
                headlines[source].push(headline);
                count++;
              }
            });
            break;
          case "ABP ASMITA":
            $('.story-title').each((element) => {
              if (count < 9) {
                const headline = $(element).text().trim();
                headlines[source].push(headline);
                count++;
              }
            });
            break;
          case "INDIAN EXPRESS GUJARATI":
            $('.is-cat-content h3').each((element) => {
              if (count < 9) {
                const headline = $(element).text().trim();
                headlines[source].push(headline);
                count++;
              }
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error scraping ${source} headlines:`, error);
      }
    }
  
    return headlines;
  }

const Headlines=async (req, res) => {
    try {
      const headlines = await scrapeHeadlines();
      res.json(headlines);
    } catch (error) {
      console.error('Error fetching headlines:', error);
      res.status(500).json({ error: 'Failed to fetch headlines' });
    }
  }

  module.exports=Headlines;