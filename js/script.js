'use strict'

function getData(coinSymbol){
    const URLCoinRank = `https://api.coinranking.com/v1/public/coins?symbols=${coinSymbol}&timePeriod=24h`;
    const URLCryptonator = `https://api.cryptonator.com/api/full/${coinSymbol}-USD`;
    $(".card-container").empty();
    $("#exchange-table").empty();
    $("#coin-desc-id").empty();
    fetchCoinRank(URLCoinRank);
    fetchCryptonator(URLCryptonator);
}

function fetchCryptonator(URLCryptonator){  //Req Res cycle for Cryptonator API
    return fetch(URLCryptonator)
    .then(response => response.json())
    .then(responseJson => {
        displayResultsCNator(responseJson);
    })
}

function fetchCoinRank(URLCoinRank){    //Req Res cycle for CoinRanking API
    return fetch(URLCoinRank)
    .then(response => response.json())
    .then(responseJson => {
        displayResultsCRank(responseJson);
        displayChart(responseJson);
        displayCoinDescription(responseJson);
    })
}

//RENDER FUNCTIONS

function displayResultsCRank(responseJson){     //Display results for CoinRanking API
    const coinsObj = responseJson.data.coins[0];
    $("#result-card").append(
        `<div class="card-container">
            <ul class="card-ul">
              <li><span class="li-name">Coin Name:</span> ${coinsObj.name}</li>
              <li><span class="li-name">Coin Rank:</span> ${coinsObj.rank}</li>
              <li><span class="li-name">Volume(24h):</span> $${(coinsObj.volume/1000000000).toFixed(2)}M </li> 
              <li><span class="li-name">Coin URL:</span> <a class="coin-url" href="${coinsObj.websiteUrl}">${coinsObj.websiteUrl}</a></li>
              <li><span class="li-name">Circulating Supply:</span> $${(coinsObj.circulatingSupply/1000000).toFixed(2)}M</li>
              <li><span class="li-name">Confirmed Supply:</span> ${coinsObj.confirmedSupply}</li>
              <li><span class="li-name">Market Cap:</span> $${(coinsObj.marketCap/1000000000).toFixed(2)}M</li>
            </ul>
        </div>    
            `)
}

function displayResultsCNator(responseJson){        //Display results for Cryptonator API
    $("#section-table").removeClass("hidden");
    $("#exchange-table").append(
        `<thead>
            <tr class="row-header">
             <td class="ex-header">Exchange</td>
             <td class="price-header">Price (USD)</td>
            </tr>
         </thead>`
    ); 
    responseJson.ticker.markets.forEach((obj) => {
        console.log(obj.market);  
        $("#exchange-table").append(
        ` <tbody>
              <tr class="row-body">
                <td class="ex-name">${obj.market}</td>
                <td class="price">${parseInt((obj.price)).toFixed(2)}</td>
              </tr>
          </tbody>
        `
        );
        $(".row-body").css("background-color", "rgba(232, 232, 232, 0.22)");
    })
}

function displayCoinDescription(responseJson){ //Displays descriptoon about the Coin
    $("#coin-desc-id").removeClass("hidden");
    const coinsObj = responseJson.data.coins[0];
    $("#coin-desc-id").append(`
    <div class="coin-desc-cointainer">
        <p class="coin-description">What is ${coinsObj.name}? <br><br> ${coinsObj.description}</p>
    </div>`)
}


function watchForm(){
    $("form").on("submit", (e)=>{
        e.preventDefault();
        const coinSymbol = $("input:text").val();
        getData(coinSymbol);
    })
}

$(watchForm); 

