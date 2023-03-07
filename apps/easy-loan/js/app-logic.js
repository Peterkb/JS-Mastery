// Global variables

//Logic Functions

//Display Functions

//Shorten Code
function getElementBy(type, value)
{
    if(type === "id" || type === "id")
        return document.getElementById(value);
    
    if(type === 'class' || type === 'Class' || type === 'ClassName' || type === 'className')
        return document.getElementsByClassName(value);
    
    if(type === 'tag' || type === 'Tag' || type === 'TagName' || type === 'tagName')
        return document.getElementsByTagName(value);
}

// Event Listeners
// inputBox.addEventListener('keyup', (e) => {
//     if (e.key === "Enter") {
//         getString()
//         window.location.href = '#Results'
//     }
// })

//get values
function getValues(){
    //clear table
    clearTable("tableBody");

    let currency = "$";

    let loanVal = gE("inputLoan").value;
    loanVal = parseFloat(loanVal);

    let monthVal = gE("inputPayNum").value;
    monthVal = parseFloat(monthVal);

    let intrestVal = gE("inputRate").value;
    intrestVal =  parseFloat(intrestVal);

    //logic function
    let loanObj = calculateLoanpmt(loanVal, monthVal, intrestVal);

    //display function
    displayLoan(loanObj, currency);
}

//Shorthand
function gE(id){
    return document.getElementById(id);
}

//Logic Function
function calculateLoanpmt(loanVal, months, rate){

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
    loanObject.pmtMonthly =  parseFloat(rounding((loanVal * (rate/1200)) /
    (1-(1+(rate/1200))**(-Math.abs(months)))));

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
function displayLoan(loanObj, currency){
    
    let tableBody = gE("tableBody");
    let templateRow =  gE("tableTemplate");
    
    for (let i = 1; i <= loanObj.months; i++) {

        let tableRow =  document.importNode(templateRow.content, true);
        let RowCols = tableRow.querySelectorAll("td");

        //months (same as i)
        RowCols[0].textContent = i;
        //pmt
        RowCols[1].textContent = `${currency}${loanObj.pmtMonthly.toFixed(2)}`;
        //principal
        RowCols[2].textContent = loanObj.pmtPrin[i].toFixed(2);
        //intrest
        RowCols[3].textContent = loanObj.pmtIntrest[i].toFixed(2);
        //total intrest
        RowCols[4].textContent = loanObj.intrestTot[i].toFixed(2);
        //balance
        RowCols[5].textContent = loanObj.balance[i].toFixed(2);

        tableBody.appendChild(tableRow);
    }
    //monthly
    gE("outPmt").innerHTML = loanObj.pmtMonthly.toFixed(2);
    //principal
    gE("outLoan").innerHTML = loanObj.principal.toFixed(2);
    //total intrest
    gE("outIntrest").innerHTML = (loanObj.intrestTot[loanObj.months].toFixed(2));
    //Total Principal + Intrest
    gE("outTotal").innerHTML = loanObj.total.toFixed(2);
}

function rounding(x){
    return x
    //return Math.round(x * 100) / 100;
}

function clearTable(x){
    gE(x).innerHTML = "";
}




/* --IDS--
inputLoan   -   loan ammount
inputPayNum -   number of pmts
inputRate   -   Intrest rate
btnCalc     -   start counting
outLoan     -   Total Principal ammount
outPmt      -   Monthly pmts
outIntrest  -   Total intrest paid
outTotal    -   output total ammount payable
tableTemplate   -   Target table tempalte
tableBody   -   output tabledata
*/