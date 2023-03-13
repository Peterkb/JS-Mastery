// Global variables
var formatNum = new Intl.NumberFormat(undefined, {
    currency: getElementBy("id", "currency").value,
    style: "currency"
})

//Logic Functions

//get values
function getValues(){    
    //clear table
    getElementBy("id", "tableBody").innerHTML = "";

    let numberTest = { value: true };

    // Get Inputs
    let loanInput = getElementBy("id", "inputAmount");
    let loanValue = parseIfANumber(loanInput, numberTest);

    let monthInput = getElementBy("id", "inputPayments");
    let monthValue = parseIfANumber(monthInput, numberTest);

    let interestInput = getElementBy("id", "inputRate");
    let interestValue =  parseIfANumber(interestInput, numberTest);

    if (!numberTest.value) {
        //Reset monthly information
        getElementBy("id", "displayPayment").innerHTML = "0.00";
        getElementBy("id", "displayLoan").innerHTML = "0.00";
        getElementBy("id", "displayIntrest").innerHTML = "0.00";
        getElementBy("id", "displayTotal").innerHTML = "0.00";
    }
    else
    {
        //logic function
        let loanObject = calculateLoanpayment(loanValue, monthValue, interestValue);

        //display function
        displayLoan(loanObject);
    }
}

function parseIfANumber(userInput, numberTest) {

    let input = userInput
    let inputValue = input.value.trim();
    let isNumber = !isNaN(inputValue) && inputValue !== '';

    if (!isNumber) {
        // Add shake class to input
        input.classList.add('is-invalid');
        input.parentNode.classList.add('shake');
    
        // Remove shake class and message after 1 second
        setTimeout(() => {
            input.classList.remove('is-invalid');
            input.parentNode.classList.remove('shake');
        }, 1000);

        // Set test pass if value is a number
        numberTest.value = false;
    }
    
    return parseFloat(input.value);
}

function calculateLoanpayment(loanVal, months, rate){

    let loanObject = {};
    //loanVal = parseFloat(loanVal);

    loanObject.months = months;
    loanObject.rate = parseFloat(rate);
    loanObject.principal = parseFloat(loanVal);

    loanObject.pmtIntrest = [0];
    loanObject.pmtPrin = [0];
    loanObject.pmtPrinTot = [0];
    loanObject.intrestTot = [0];
    loanObject.balance = [parseFloat(loanVal)];

    //Total Monthly pmt = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)to pow(-Number of Months))
    loanObject.pmtMonthly =  parseFloat((loanVal * (rate/1200)) /
    (1-(1+(rate/1200))**(-Math.abs(months))));

    for (i = 1; i <= months;i++){
        //Intrest : Previous Remaining Balance * rate/1200
        loanObject.pmtIntrest.push(parseFloat(loanObject.balance[i-1] * (rate/1200)));
        //Total Monthly pmt - Interest pmt (Principal pmt)
        loanObject.pmtPrin.push(parseFloat(loanObject.pmtMonthly - loanObject.pmtIntrest[i]));
        //principal total
        loanObject.pmtPrinTot.push(parseFloat(loanObject.pmtPrinTot[i-1]+loanObject.pmtPrin[i]))
        //Intrest total
        loanObject.intrestTot.push(parseFloat(loanObject.intrestTot[i-1] + loanObject.pmtIntrest[i]));
        //remaining balance
        loanObject.balance.push(Math.abs(parseFloat(loanObject.balance[i-1]-loanObject.pmtPrin[i])));
    }

    loanObject.total = parseFloat(loanObject.intrestTot[months] + loanObject.principal);

    return loanObject;
}

//Display function
function displayLoan(loanObj){
    changeCurrency()

    let tableBody = getElementBy("id", "tableBody");
    let templateRow =  getElementBy("id", "tableTemplate");
    
    for (let i = 1; i <= loanObj.months; i++) {

        let tableRow =  document.importNode(templateRow.content, true);
        let RowCols = tableRow.querySelectorAll("td");

        //months (same as i)
        RowCols[0].textContent = i;
        //paymentmt
        RowCols[1].textContent = `${formatNum.format(loanObj.pmtMonthly)}`;
        //principal
        RowCols[2].textContent = formatNum.format(loanObj.pmtPrin[i]);
        //interest
        RowCols[3].textContent = formatNum.format(loanObj.pmtIntrest[i]);
        //total intrest
        RowCols[4].textContent = formatNum.format(loanObj.intrestTot[i]);
        //balance
        RowCols[5].textContent = formatNum.format(loanObj.balance[i]);

        tableBody.appendChild(tableRow);
    }
    //monthly
    getElementBy("id", "displayPayment").innerHTML = formatNum.format(loanObj.pmtMonthly);

    //principal
    getElementBy("id", "displayLoan").innerHTML = formatNum.format(loanObj.principal);

    //total intrest
    getElementBy("id", "displayIntrest").innerHTML = formatNum.format(loanObj.intrestTot[loanObj.months]);

    //Total Principal + Intrest
    getElementBy("id", "displayTotal").innerHTML = formatNum.format(loanObj.total);

    window.location.href = "#Results"
}

//Shorten Code
function getElementBy(type, value)
{
    if(type === "id" || type === "Id")
        return document.getElementById(value);
    
    if(type === 'class' || type === 'Class' || type === 'ClassName' || type === 'className')
        return document.getElementsByClassName(value);
    
    if(type === 'tag' || type === 'Tag' || type === 'TagName' || type === 'tagName')
        return document.getElementsByTagName(value);
}

function changeCurrency() {
    formatNum = new Intl.NumberFormat(undefined, {
        currency: getElementBy("id", "currency").value,
        style: "currency"
    })
}

//Event Listeners
getElementBy("id", "inputAmount").addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getValues()
        window.location.href = '#Results'
    }
})

getElementBy("id", "inputPayments").addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getValues()
        window.location.href = '#Results'
    }
})

getElementBy("id", "inputRate").addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getValues()
        window.location.href = '#Results'
    }
})

/**
 * TODO
 * Save loans to local storage for recollection
 * Make printable version of table
 */