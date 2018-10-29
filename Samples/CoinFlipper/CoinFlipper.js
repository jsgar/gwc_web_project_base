/**
 * Jenna Sgarlata
 */

/******************************************************************************************************************
 * CoinFlipper.js
 * Adapted from Dean & Dean, ch 9. Converted to JS by Jenna Sgarlata. Method comments taken from original source by
 * Dr. Mark Hornick
 *
 * This program generates a histogram of coin flips. Suppose you have 5 coins and flip them 100000 times.
 * Some flips will result in all heads, some with all tails, and others with some combination of heads and tails.
 * The histogram displays the number of times each combination occurred over all flips.
 ******************************************************************************************************************/
function CoinFlipper() {
    let numberOfCoins;
    let numberOfRepetitions;
    let frequency;
    let output;

    /**
     * Gathers input from the user,
     * controls execution, and measures how long it takes to execute.
     */
    this.init = function() {
        "use strict";
        let executionTime = 0;
        let valid;

        numberOfCoins = document.getElementById("coins_text").value;
        numberOfRepetitions = document.getElementById("throws_text").value;
        valid = checkValidity();
        numberOfCoins = parseInt(numberOfCoins);
        numberOfRepetitions = parseInt(numberOfRepetitions);
        output = document.getElementById("output");
        output.innerHTML = "";
        if (valid === true) {
            frequency = new Array(numberOfCoins + 1);
            for (let i = 0; i < frequency.length; i += 1) {
                frequency[i] = 0;
            }
            executionTime = Date.now();
            flipCoins();
            executionTime = Date.now() - executionTime;
            printHistogram();

            let timing = document.createElement("p");
            let timingStr = document.createTextNode("Coin Flipper Time: " + executionTime + "ms");
            timing.appendChild(timingStr);
            output.appendChild(timing);
        }
    };

    /**
     * This method checks to see if the user input is valid. Valid input must meet the criteria stated on the lab page.
     * @returns {boolean} true if valid; false if invalid
     */
    function checkValidity() {
        "use strict";
        let errorMessage;
        let validCoins = true;
        let validReps = true;
        let validParams = false;
        let coinError = document.getElementById("coinError");
        let repError = document.getElementById("throwError");

        coinError.innerHTML = "";
        if (numberOfCoins === ""){
            errorMessage = document.createTextNode("No input detected.");
            validCoins = false;
        } else if (isNaN(numberOfCoins)) {
            errorMessage = document.createTextNode("\' " + numberOfCoins + " \' is not a number.");
            validCoins = false;
        } else if (numberOfCoins < 1 || numberOfCoins >10) {
            errorMessage = document.createTextNode("The number of coins must be between 1 and 10.");
            validCoins = false;

        } else if ((numberOfCoins.indexOf(".") != -1)) {
            errorMessage = document.createTextNode("The number must be a positive integer.");
            validCoins = false;
        }

        if (validCoins === false) {
            coinError.appendChild(errorMessage);
        }

        repError.innerHTML = "";
        if (numberOfRepetitions === "") {
            errorMessage = document.createTextNode("No input detected.");
            validReps = false;
        } else if (isNaN(numberOfRepetitions)) {
            errorMessage = document.createTextNode("\'" + numberOfRepetitions + "\' is not a number.");
            validReps = false;
        } else if (numberOfRepetitions < 1){
            errorMessage = document.createTextNode("The number must be a positive integer.");
            validReps = false;
        } else if (numberOfCoins.indexOf(".") != -1) {
            errorMessage = document.createTextNode("The number must be a positive integer.");
            validReps = false;
        }

        if (validReps === false) {
            repError.appendChild(errorMessage);
        }

        if (validCoins === true && validReps === true){
            validParams = true;
        }
        return (validParams);
    }
    /**
     * This method flips a specified number of coins a specified number of times,
     * and gathers the number of times a certain number of heads occurred in each flip into the frequency[] array.
     */
    function flipCoins() {
        "use strict";
        for (let rep = 0; rep < numberOfRepetitions; rep += 1) {
            let heads = doSingleFlip();
            frequency[heads] += 1;
        }
    }

    /**
     * This method flips a specified number of coins and returns the number heads that occurred in the flip.
     * It makes use of a random number generator to randomly generate heads or tails for each coin flipped.
     * @return the number of heads that occurred in the flip
     */
    function doSingleFlip() {
        "use strict";
        let singleHeads = 0;
        for (let i = 0; i < numberOfCoins; i += 1) {
            singleHeads += Math.floor(Math.random() * 2);
        }
        return singleHeads;
    }

    /**
     * This method prints a histogram of the number of heads that occurred for a specified number of flips
     * Notes: The output generated for numCoins=5 and numReps=100000 may look something like this:
     *
     * Number of times each head count occurred in 100000 flips of 5 coins:
     * 0  3076  ***
     * 1  15792  ****************
     * 2  31348  *******************************
     * 3  31197  *******************************
     * 4  15552  ****************
     * 5  3035  ***
     */
    function printHistogram() {
        "use strict";
        let fractionOfReps;
        let table = document.createElement("table");

        table.setAttribute("id", "histogram");
        for (let heads = 0; heads <= numberOfCoins; heads += 1) {
            fractionOfReps = 100*(frequency[heads]/numberOfRepetitions);
            let tr = document.createElement("tr");
            let flipNum = document.createElement("td");
            let rowText = document.createTextNode(heads);
            let occurrences = document.createElement("td");
            let oText = document.createTextNode(frequency[heads]);
            let barHolder = document.createElement("td");
            let meter = document.createElement("meter");

            meter.setAttribute("value", fractionOfReps);
            meter.setAttribute("min", 0);
            meter.setAttribute("max", 100);
            barHolder.setAttribute("class", "barCell");
            flipNum.setAttribute("class", "numCell");
            occurrences.setAttribute("class", "numCell");
            barHolder.appendChild(meter);
            flipNum.appendChild(rowText);
            tr.appendChild(flipNum);
            occurrences.appendChild(oText);
            tr.appendChild(occurrences);
            tr.appendChild(barHolder);
            table.appendChild(tr);
        }
        output.appendChild(table)
    }

}