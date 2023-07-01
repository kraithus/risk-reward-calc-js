function riskAdvise()
{   
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
    var takeProfitPips = resultLossStringInput * ratioConsequent * lotSize * -1; // multiply by negative 1 to ensure profit calc is positive
    var stopLossPips = resultLossStringInput * 1 * lotSize; // just for consistency

    // actualities. actual shit now uhm, those are false pips, my own measurement btw
    // okay now we give these inputs values to show the user
    if (position === "long") {
    takeProfit.value = takeProfitPips + orderPrice;
    stopLoss.value = orderPrice - stopLossPips;
    console.log("take profit pips: " + takeProfitPips);
    console.log("order price: " + orderPrice);
    console.log("stop loss price: " + stopLossPips);
    console.log("resultloss stringinput: "+ resultLossStringInput)
    console.log("untrimmed loss input: "+ untrimmedLossInput)
    } else {
        console.log("dead X");
    }
}