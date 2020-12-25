const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/:user', (req, res) => {
    const url = 'https://www.instagram.com/' + req.params.user;

    (async() => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);

        const imgList = await page.evaluate(() => {
            const nodeList = document.querySelectorAll('article img');
            const imgArray = [...nodeList];
            const list = imgArray.map(({ src }) => ({ src }));
            return list;
        })

        await browser.close();

        res.send(JSON.stringify(imgList));
    })();
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Running");
})