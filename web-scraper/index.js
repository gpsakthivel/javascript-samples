var express = require('express');
var cheerio = require('cheerio');
var axios = require('axios');
const PORT = 8000;

const app = express()
const url = "https://www.theguardian.com/international";

axios(url)
    .then(response => {
        const html = response.data
        console.log(html);
        const $ = cheerio.load(html);
        const article = [];

        $('.fc-item__title').each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            article.push({
                title,
                url
            })
        })
        console.log(article)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))