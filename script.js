'use strict'


function getData(coinSymbol){
    const URLCoinRank = `https://api.coinranking.com/v1/public/coins?symbols=${coinSymbol}&timePeriod=24h`;
    const URLCryptonator = `https://api.cryptonator.com/api/full/${coinSymbol}-USD`;
    $(".card-container").empty();
    $("#exchange-table").empty();
    fetchCoinRank(URLCoinRank);
    fetchCryptonator(URLCryptonator);
}

function fetchCryptonator(URLCryptonator){
    return fetch(URLCryptonator)
    .then(response => response.json())
    .then(responseJson => displayResultsCNator(responseJson))
}

function fetchCoinRank(URLCoinRank){
    return fetch(URLCoinRank)
    .then(response => response.json())
    .then(responseJson => displayResultsCRank(responseJson))
}

//RENDER FUNCTIONS

function displayResultsCRank(responseJson){
    console.log(responseJson);
    $(".name-logo").empty();
    const coinsObj = responseJson.data.coins[0];
    $("#result-card").append(
        `<div class="name-logo">
            <h3>Coin Symbol: <span>${coinsObj.symbol}</span></h3>
        </div>
        <div class="card-container">
            <ul class="card-ul">
              <li><span class="li-name">Coin Name:</span> ${coinsObj.name}</li>
              <li><span class="li-name">Coin Rank:</span> ${coinsObj.rank}</li>
              <li><span class="li-name">Volume(24h):</span> $${Math.trunc(coinsObj.volume/1000000000)}M </li>
              <li><span class="li-name">Coin URL:</span> <a href="${coinsObj.websiteUrl}">${coinsObj.websiteUrl}</a></li>
              <li><span class="li-name">Circulating Supply:</span> $${coinsObj.circulatingSupply/10000000}M</li>
              <li><span class="li-name">Confirmed Supply:</span> ${coinsObj.confirmedSupply}</li>
              <li><span class="li-name">Market Cap:</span> $${coinsObj.marketCap/1000000000}M</li>
            </ul>
        </div>    
            `)
}

function displayResultsCNator(responseJson){        //Display results for Cryptonator API
    console.log(responseJson)
    $("#section-table").removeClass("hidden");
    $("#exchange-table").append(
        `<thead>
            <tr class="row-header">
             <td class="ex-header">Exchange</td>
             <td class="price-header">Price</td>
            </tr>
         </thead>`
    );
    responseJson.ticker.markets.forEach((obj) => {
        console.log(obj.market);        
        $("#exchange-table").append(
        ` <tbody>
              <tr class="row-body">
                <td class="ex-name">${obj.market}</td>
                <td class="price">${obj.price}</td>
              </tr>
          </tbody>
        `
        );
        $(".row-body").css("background-color", "rgba(232, 232, 232, 0.22)");
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

