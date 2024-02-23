var position;
var lotSize;
var orderPrice;

function calculate() {
    // inputs
    position = document.getElementById("position").value;
    lotSize = Number(document.getElementById("lotSize").value);
    orderPrice = Number(document.getElementById("orderPrice").value);
    var stopLoss = Number(document.getElementById("stopLoss").value);
    var takeProfit= Number(document.getElementById("takeProfit").value);

    // Perform the validation
    if (position.trim() === "" || !isFinite(lotSize) || !isFinite(orderPrice) || !isFinite(stopLoss) || !isFinite(takeProfit)) {
        alert("Please fill in all required fields!");
        return;
    }
    
    // outputs
    var resultProfitString = document.getElementById("resultProfitString");
    var resultLossString = document.getElementById("resultLossString");
    var resultRatio = document.getElementById("resultRatio");

    /* Formats a number as a string with a dollar sign ($) and two decimal places
        with a 0 even if there is no second decimal digit.
    */
    function formatLikeMoney(number) {
        var formattedNumber = "$" + Number(Math.round(number + "e2") + "e-2").toFixed(2);
        return formattedNumber;
    }

    // order of subtraction if whatever.
    if (position === "long") {
        var takeProfitOrderPriceDiff = takeProfit - orderPrice;
        var stopLossOrderPriceDiff = stopLoss - orderPrice;
    } else if (position === "short") {
        var takeProfitOrderPriceDiff = orderPrice - takeProfit;  
        var stopLossOrderPriceDiff = orderPrice - stopLoss;  
    }

    // raw variable meaning number to be adjusted to 2dp
    var rawResultProfit = lotSize * takeProfitOrderPriceDiff * 100000;
    var resultProfit = parseFloat(rawResultProfit.toFixed(2));

    var rawResultLoss = lotSize * stopLossOrderPriceDiff * 100000;
    var resultLoss = parseFloat(rawResultLoss.toFixed(2));

    // multiply by -1 so that profit value in ratio is outputted as positive integer
    var profitRation = (resultProfit / resultLoss) * -1;

    // The value of net profit / net loss. In 1 : x, it is represented as x
    var roundedProfitRation = profitRation.toFixed(2);
    resultRatio.value = "1:" + roundedProfitRation;

    // a string of the net profit and net loss represented in dollars
    resultLossString.value = formatLikeMoney(resultLoss);
    resultProfitString.value = formatLikeMoney(resultProfit);
}