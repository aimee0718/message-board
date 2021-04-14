var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-4-1'
    },
    {
        name: 'Aimee Li',
        message: '今天暴雨！',
        dateTime: '2021-4-2'
    },
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-4-7'
    },
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-4-10'
    }
]

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

http.
    createServer()
    .on('request', function (req, res) {
        var parseObj = url.parse(req.url, true)
        var pathname = parseObj.pathname
        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404 not found')
                }
                var ret = template.render(data.toString(), {
                    comments: comments
                })
                return res.end(ret)
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 not found')
                }
                return res.end(data)
            })
        } else if (pathname === '/review') {
            var comment = parseObj.query
            var now = new Date().getTime()
            comment.dateTime = getNowFormatDate(now)
            comments.push(comment)
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        } else if (pathname.indexOf('/public/') === 0) {
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 not found')
                }
                return res.end(data)
            })
        } else {
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('404 not found')
                }
                return res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running.....');
    })