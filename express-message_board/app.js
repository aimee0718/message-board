var express = require('express')
var fs = require('fs')
var template = require('art-template')
var bodyParser = require('body-parser')

var app = express() // 等价于 http.createServer

app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var comments = [
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-04-01'
    },
    {
        name: 'Aimee Li',
        message: '今天暴雨！',
        dateTime: '2021-04-02'
    },
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-04-07'
    },
    {
        name: 'Aimee Li',
        message: '今天天气不错！',
        dateTime: '2021-04-10'
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



app.get('/', function (req, res) {
    res.render('index.html', {
        comments: comments
    })
})

app.get('/post', function (req, res) {
    res.render('post.html')
})

app.post('/post', function (req, res) {
    var comment = req.body
    var now = new Date().getTime()
    comment.dateTime = getNowFormatDate(now)
    comments.unshift(comment)
    res.redirect('/')
})

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000.');
})
