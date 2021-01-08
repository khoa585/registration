require("dotenv").config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
let cors = require('cors')
let mongoose = require("mongoose");
try {
    mongoose.connect("mongodb+srv://hoduykhoa:titikakatika2207n@cluster0.lodmh.mongodb.net/school?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Connected to DB hoduykhoa");
        }
    });
} catch (error) {
    handleError(error);
}
app.use(bodyParser.urlencoded({ extended: true }))
import Authencation from './src/common/Authencation'
import router from './src/Server/index'
app.use(cors())
app.use(Authencation)
app.use('/api', router)
app.use('/', (req, res) => {
    res.send('hello world')
})

// const puppeteer = require('puppeteer');
// (async () => {
//     const k = '#ctl00_ContentPlaceHolder1_cmdLogin'
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('http://sinhvien.ute.udn.vn/Dang-Nhap.html');
//     await page.type('#ctl00_ContentPlaceHolder1_txtTenTruyCap', '1811505310219')
//     await page.type('#ctl00_ContentPlaceHolder1_txtMatKhau', 'KHOA2411200')
//     await page.$eval(k, el => el.click());
//     await page.waitFor(1000);
//     const results = await page.evaluate(() => {
//         let items = document.querySelectorAll("#menu > ul > li:nth-child(4) > div > ul > li > a > b") ;
//         let links = [];
//         items.forEach(item => {
//             links.push(item.innerText);
//         });
//         return links;
//       });
//       console.log(results)
   
//     // await page.waitFor(100000);


//     await page.screenshot({ path: 'example.png' });
//     // console.log('Rainfall Submitted!');
//     await browser.close();
// })();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
