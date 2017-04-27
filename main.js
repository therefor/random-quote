var text= ""; //分享到新浪微博的text

//获取随机经典电影台词，插件http://www.jqueryscript.net/text/jQuery-Ajax-Based-Random-Quote-Generator-Random-Quotes.html
var APIurl = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=general';
var headers={ 'X-Mashape-Key': 'nDegI0wJR6mshIjYx6LMEfYdXB3Lp1oa3FRjsnfnpNhjfD2Xjb',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};

var getQuote = function(){
    $.ajax({
        type: 'GET',
        url: APIurl,
        headers: headers,
        success: function(response){
            response= JSON.parse(response)
            processQuotes(response);
            text = response.quote + ' -- '+ response.author;
        },
        error: function(err){
            console.log("An error occured", err);
        }
    })
}

function processQuotes(response){
    //change quote
    $("#quote").html('<i class = "fa fa-quote-left" aria-hidden="true"><\/i>' + response.quote);
    $("#author").html('__<i class = "fa fa-pencil" aria-hidden="true"><\/i> ' + response.author);
    //change color
    var colorChange = getRandomColor();
    $( "p" ).animate( {color: colorChange}, 1000);
    $("body, button").animate({ backgroundColor: colorChange}, 1000);
}

function getRandRGB(){
    return Math.round( 255*Math.random() );
}

function getRandomColor(){
    return  "rgb("+ getRandRGB() + "," + getRandRGB() + "," + getRandRGB() + ")";
}

$(document).ready(function(){
    getQuote();
    $("button#newQuote").click(function(){
        getQuote();
    });

    $("#sinaButton").on("click", function() {
        window.open("http://service.weibo.com/share/share.php?url=http://codepen.io/StephenZhong/full/PGojEA/&appkey=&title=" + text + "&pic=&ralateUid=&language=zh_cn")

    });
});