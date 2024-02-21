function riskAdvise()
{   
    /* Formats a number as a string with a dollar sign ($) and two decimal places
    with a 0 even if there is no second decimal digit.
    */
    function formatLikeMoney(number) {
        var formattedNumber = "$" + Number(Math.round(number + "e2") + "e-2").toFixed(2);
        return formattedNumber;
    }

    function roundToFiveDp(number) {
        var formattedNumber = Number(Math.round(number + "e5") + "e-5").toFixed(5);
        return formattedNumber;
    }

    position = document.getElementById("position").value;
    lotSize = Number(document.getElementById("lotSize").value);
    orderPrice = Number(document.getElementById("orderPrice").value);

    // lot size was already given at very top of calculate function, sooo
    var resultRatioInput = document.getElementById("resultRatio").value;
    // amount willing to lose
    var untrimmedLossInput = document.getElementById("resultLossString").value;
    var resultLossStringInput = Number(untrimmedLossInput.substring(1));
    // trim out the consequent from the string as antecedent will always be 1
    var getRatioConsequent = resultRatioInput.split(":");
    var ratioConsequent = Number(getRatioConsequent[1].trim());

    // calcs of price movements
    var takeProfitPips = (resultLossStringInput * ratioConsequent) / (lotSize * 100000 * -1); // multiply by negative 1 to ensure profit calc is positive
    var stopLossPips = (resultLossStringInput * 1) / (lotSize * 100000 * -1); // multiply by -1 so we get a positive integer to subtract from order price

    // actualities. actual shit now uhm, those are false pips, my own measurement btw
    // okay now we give these inputs values to show the user
    if (position === "long") {
    takeProfit.value = roundToFiveDp(takeProfitPips + orderPrice);
    stopLoss.value = roundToFiveDp(orderPrice - stopLossPips);
    // multiply by -1 to ensure positive integer since resultLossStringInput is a negative number
    var potentialProfit = ratioConsequent * resultLossStringInput * -1;
    resultProfitString.value = formatLikeMoney(potentialProfit);
    
    // annoying, alas
    console.log("lot size: " + lotSize);
    console.log("take profit pips: " + takeProfitPips);
    console.log("order price: " + orderPrice);
    console.log("stop loss pips: " + stopLossPips);
    console.log("resultloss stringinput: "+ resultLossStringInput)
    console.log("untrimmed loss input: "+ untrimmedLossInput)

    } else if (position === "short"){
        takeProfit.value = roundToFiveDp(orderPrice - takeProfitPips);
        stopLoss.value = roundToFiveDp(orderPrice + stopLossPips);    
        // multiply by -1 to ensure positive integer since resultLossStringInput is a negative number
        var potentialProfit = ratioConsequent * resultLossStringInput * -1;
        resultProfitString.value = formatLikeMoney(potentialProfit);    
    } else {
        console.log("Invalid position");
    }

    // on click show fields.
    var hiddenFields = document.getElementById('hiddenFields');
    var isHidden = hiddenFields.classList.contains('hidden');

    // If fields are currently hidden, show them
    if (isHidden) {
        hiddenFields.classList.remove('hidden');
    } else {
        // Fields are currently shown, do nothing
        return; // Exit the function early without further toggling
    }
}