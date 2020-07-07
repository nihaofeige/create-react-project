import Mock from 'mockjs'
const Random = Mock.Random;

const produceNewsData = function() {
    let data = [];
    for (let i = 0; i < 20; i++) {
        let newArticleObject = {
            name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            describe: Random.csentence(5, 30), //  Random.csentence( min, max ) 描述
            imgUrl: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            switch: Math.random() >= 0.5,
            id: parseInt(Math.random()*1+1,10) + i
        }
        data.push(newArticleObject)
    }
    return {
        success: true,
        status: '200',
        request: '/',
        data: {
          total: 20,
          data
        }
    }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('http://localhost:9000/home/index','post', produceNewsData);