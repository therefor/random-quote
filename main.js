var text= ""; //分享到新浪微博的text
var responseArr = []; //ajax api太慢了，每次多存几条起来
var maxLength = 60;

//获取随机经典电影台词，插件http://www.jqueryscript.net/text/jQuery-Ajax-Based-Random-Quote-Generator-Random-Quotes.html
var APIurl = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=general';
var headers={ 'X-Mashape-Key': 'nDegI0wJR6mshIjYx6LMEfYdXB3Lp1oa3FRjsnfnpNhjfD2Xjb',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};

var getQuote = function( callback ){
    $.ajax({
        type: 'GET',
        url: APIurl,
        headers: headers,
        success: callback,
        error: function(err){
            console.log("An error occured", err);
        }
    })
}

var processOneQuote = function(response) {
    response = JSON.parse(response);
    console.log( "GET FIRST quote: " + response.quote + ' -- ' + response.author);
    processQuotes(response);
    text = response.quote + ' -- '+ response.author;
    getQuoteToArr();
}

var pushIntoArr = function(response) {
    response = JSON.parse(response);
    responseArr.push(response);
}

function getQuoteToArr(){
    var i;
    for ( i = 0; i < maxLength; i++){
        getQuote(pushIntoArr);
    }
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
    getQuote( processOneQuote );
    var res = undefined;
    var alldownload = false;
    $("button#newQuote").click(function(){
        if( responseArr.length > maxLength /2) {
            //download success
            alldownload = true;
        }
        if ( alldownload && responseArr.length < maxLength/5 ){
            //download again
            console.log("download again!");
            alldownload = false;
            getQuoteToArr();
        }
        res = responseArr.shift();
        processQuotes(res);
        text = res.quote + ' -- '+ res.author;
    });

    $("#sinaButton").on("click", function() {
        window.open("http://service.weibo.com/share/share.php?url=http://codepen.io/StephenZhong/full/PGojEA/&appkey=&title=" + text + "&pic=&ralateUid=&language=zh_cn")
    });
});