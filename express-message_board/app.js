var express = require('express')
var fs = require('fs')
var template = require('art-template')

var app = express() // 等价于 http.createServer

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

app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))

app.get('/', function (req, res) {
    fs.readFile('./views/index.html', function (err, data) {
        var ret = template.render(data.toString(), {
            comments: comments
        })
        res.end(ret)
    })
})

app.get('/post', function (req, res) {
    fs.readFile('./views/post.html', function (err, data) {
        res.end(data)
    })
})

app.get('/review', function (req, res) {
    var comment = req.query
    var now = new Date().getTime()
    comment.dateTime = getNowFormatDate(now)
    comments.push(comment)
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
})

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000.');
})
