let request = require('request-promise');
let cheerio = require("cheerio");
const URL_PAGE = "http://sinhvien.ute.udn.vn/Dang-Nhap.html";
import { getData, putData } from "./../../common/cache";
let UserDb = require("../../Modal/Users");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
let cookieJar = request.jar()
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
export const login = async () => {

    const options = {
        'method': 'POST',
        'url': URL_PAGE,
        'headers': {
            'Cache-Control': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
            'X-MicrosoftAjax': 'Delta=true',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
            'Content-Type': 'application/form-data; charset=UTF-8',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5,es;q=0.4',
            'Cookie': 'ASP.NET_SessionId=yxiytfufzsgdhpmlu24k1bah; DangNhap=yes; UserNameAndPassword=UserName=63d3117b5b6770e6abfb18993de9ff2c'
        },
        formData: {
            'ctl00$ToolkitScriptManager1': 'ctl00$ContentPlaceHolder1$upChuyenMuc|ctl00$ContentPlaceHolder1$cmdLogin',
            'ctl00$ContentPlaceHolder1$txtTenTruyCap': '1811505310219',
            'ctl00$ContentPlaceHolder1$txtMatKhau': 'KHOA241120',
            '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$cmdLogin',
            '__VIEWSTATE': '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',
            '__VIEWSTATEGENERATOR': '445D4CE6',
            '__EVENTVALIDATION': '/wEdAAttiO4TTrIwATu8ngwNxt6BIHqd4iDY20jbWoH+0loMQ6xN8bI03Fxv/Sztsv0wnCWViJYgnCU4Nyg0BOmXMZbvdQDuQwVsOxoJZss3/UxciZel738sFMQDqhKVdjhBNOgomBIzeLGWAN/UCp6464GdoPnctQblj4Oa5EowLSLA8SUby2GmTDsPxh9VjqPAQbtV7vBBEB75AGZR2FjGGmcfK2ByZX0SYnh7+0imfx3m3AiH3QfAFOOYLOA67+gLqr7dLvfXCuA+jtVbjeZAqCKI',
            '__ASYNCPOST': 'true'
        },
        jar: cookieJar
    };
    return request(options, function (error, response) {
        if (error) throw new Error(error);
        const $ = response.headers
        const regex = RegExp('DangNhap=yes');
        const result = regex.test($['set-cookie'])
        cookieJar.getCookies(URL_PAGE);
        if (result) return true
        return false
    });


};
export const getHistory = async () => {
    const body = await request({
        'method': 'GET',
        'url': "http://sinhvien.ute.udn.vn/HoatDong/Thong-Tin-Hoat-Dong.aspx",
        jar: cookieJar
    })
    const $ = cheerio.load(body);
    let data = [];
    let parentTable = $('#ctl00_ContentPlaceHolder1_upThayDoi > section > div > section > div.panel-body > div > div > table').children('tbody').children();
    parentTable.map(function () {
        let temp = [];
        let obj = {};
        $(this).children().map(function () {
            temp.push($(this).text().trim());
        });
        [obj.stt, obj.nameActivity, obj.point, obj.ApprovedBy, obj.time] = temp;
        delete obj.stt;
        data.push(obj);
    });
    return data
}
export const getGeneralInformation = async (url) => {
    const body = await request(url)
    const $ = cheerio.load(body);
    let data = [];
    let parentTable = $('.ForumsGrid>.row>div[class] ')
    parentTable.each(function () {
        let objs = {}
        const regex = /[^(\d.\/*)]/ig;
        objs['title'] = $(this).find('.forum-details a:nth-child(1).threadTitle').text().trim();
        let actor = $(this).find('.forum-details .username').text().trim()
        objs['author'] = 'Đăng bởi: ' + actor + ' ' + $(this).find('.forum-details span.hidden-xs').text().trim().replace(regex, '')
        data.push(objs)

    })
    return data
}

export const getLibrary = async (url) => {
    const body = await request(url)
    const $ = cheerio.load(body);
    let data = [];
    let parentTable = $('#sidebar-section > div > div > div.col-md-9.col-sm-8.col-xs-12.content-side > div:nth-child(5) > div.gridContent > div > div > div[class]')
    parentTable.each(function () {
        let objs = {}

        objs['title'] = $(this).find('.forum-details a:nth-child(1).threadTitle').text().trim();
        let actor = $(this).find('.forum-details .username').text().trim()
        objs['author'] = 'Đăng bởi: ' + actor + ' ' + $(this).find('.forum-details span.hidden-xs').text().trim().replace(regex, '')
        data.push(objs)

    })
    return data
}


export const getNewPost = async (url) => {
    const body = await request(url)
    const $ = cheerio.load(body);
    let data = [];
    let parentTable = $('#sidebar-section > div > div > div.col-md-3.col-sm-4.col-xs-12 > aside > section > div > div:nth-child(1) > div > div > div')
    parentTable.each(function () {
        let objs = {}
        const regex = /(\S.*)(?:([ ]))/g;
        objs['title'] = $(this).find('a:nth-child(1).username').text().trim();
        let actor = $(this).find('span').text().trim()
        let days = $(this).find('span').text().trim().split(regex)
        let dayRegex = days[days.length - 1].replace(/[^\d-]/g, '')
        let name = actor.replace(/.*\n.*bởi/g, '')
        let nameactor = name.replace(/\n\ +(?=[^\w]|)/g, '')
        objs['author'] = 'Được gửi bởi ' + nameactor.split(/ngày.*/ig)[0] + ' ngày gửi ' + dayRegex
        data.push(objs)
    })
    return data
}


export const getInforuser = async () => {
    const body = await request({
        'method': 'GET',
        'url': "http://sinhvien.ute.udn.vn/Thay-Doi-Thong-Tin.aspx",
        jar: cookieJar
    })
    const $ = cheerio.load(body);
    let obj = {}
    obj['imgage'] = 'http://sinhvien.ute.udn.vn/' + $('#ctl00_ContentPlaceHolder1_imgViewer').attr('src')
    obj['masv'] = $('#ctl00_ContentPlaceHolder1_lblMaSV').text()
    obj['name'] = $('#ctl00_ContentPlaceHolder1_lblHoTen').text()
    obj['class'] = $('#ctl00_ContentPlaceHolder1_lblLopSinhHoat').text()
    obj['status'] = $('#ctl00_ContentPlaceHolder1_lblSoDoan > font > b').text()
    obj['sdt'] = $('#ctl00_ContentPlaceHolder1_txtDienThoai').attr('value')
    obj['tdt'] = $('#ctl00_ContentPlaceHolder1_txtThuDienTu').attr('value')
    obj['days'] = $('#ctl00_ContentPlaceHolder1_txtNgaySinh').attr('value')
    return obj
}

