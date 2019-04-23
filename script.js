'use strict'


function getData(coinSymbol){
    const URLCoinRank = `https://api.coinranking.com/v1/public/coins?symbols=${coinSymbol}&timePeriod=24h`;
    const URLCryptonator = `https://api.cryptonator.com/api/full/${coinSymbol}-USD`;
    $(".card-container").empty();
    fetch(URLCryptonator)
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
        responseJson.ticker.markets.forEach((obj) => {
            console.log(obj.market);
            $("#result-card").append(
               `<div class="card-container">
                  <ul class="card-ul">
                    <li><span class="li-name">Exchange:</span> <a href="#"> ${obj.market}</a></li>
                    <li><span class="li-name">Price:</span> ${obj.price}</li>
                  </ul>
                </div>    
                    `
            )
        })
    })
}


function watchForm(){
    $("form").on("submit", (e)=>{
        e.preventDefault();
        const coinSymbol = $("input:text").val();
        getData(coinSymbol);
    })
}




$(watchForm);

