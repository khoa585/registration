const request = require("request-promise");
let cheerio = require("cheerio");
const URL_PAGE = "http://sinhvien.ute.udn.vn/Dang-Nhap.html";
import { getData, putData } from "./../../common/cache";
let UserDb = require("../../Modal/Users");
const bcrypt = require('bcrypt')
const puppeteer = require("puppeteer");
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const create = (username, password) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            await UserDb.create({
                username,
                password: hash
            });
        })
    })
}

export const login = async (username, password) => {
    const result = await UserDb.findOne({ "username": username })
    if (result){
        return bcrypt.compareSync(password, result.password)
    } 
    const k = '#ctl00_ContentPlaceHolder1_cmdLogin'
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });

      
    const page = await browser.newPage();
    await page.goto(URL_PAGE);
    await page.type('#ctl00_ContentPlaceHolder1_txtTenTruyCap', username)
    await page.type('#ctl00_ContentPlaceHolder1_txtMatKhau', password)
    await page.$eval(k, el => el.click());
    await page.waitForTimeout(800);
    const results = await page.evaluate(() => {
        let items = document.querySelectorAll("#menu > ul > li:nth-child(4) > div > ul > li > a > b");
        let links = [];
        items.forEach(item => {
            links.push(item.innerText);
        });
        return links;
    });
    await browser.close();

    if (results.length != 0) {
        create(username, password)
        return true
    }
    return false

};