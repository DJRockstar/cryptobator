function displayChart(responseJson){
    const ctx = $("#myChart");
    let myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        datasets: [
            {
              label: "24H Overview",
              borderColor: "rgb(255,99,132)",
              backgroundColor: "rgba(255,99,132,0.25)",
              lineTension: 0.2,
              data: responseJson.data.coins[0].history   //Array of Prices coming from cryptoRanking
            }
          ]
    }
  })
}
