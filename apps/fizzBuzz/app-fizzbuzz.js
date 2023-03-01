//Get Values
//Controller function
function getValues(){
    //initialize page
    getById("alert").classList.add("d-none", "invisible");
    getById("tableData").innerHTML = "";
    
    let fizzVal = gE("fizzVal").value;
    let buzzVal = gE("buzzVal").value;

    fizzVal = parseInt(fizzVal);
    buzzVal = parseInt(buzzVal);

    let fizzTxt = "Fizz";
    let buzzTxt = "Buzz";

    if (Number.isInteger(fizzVal) && Number.isInteger(buzzVal)) {
        //Create array
        fizzBuzzArr = CreateArray(fizzVal, buzzVal, fizzTxt, buzzTxt);

        //Display array
        getById("tableData", "tableInfo").classList.remove("invisible", "d-none");
        getById("tableInfo").classList.remove("d-none");
        generateNumText(fizzBuzzArr ,fizzTxt, buzzTxt);
    }else{
        getById("alert").classList.remove("d-none", "invisible");
    }
}

//Shorten Code
function getById(id){
    return document.getElementById(id);
}

//Create FizzBuzz Array
function CreateArray(fizzVal, buzzVal, fizzTxt, buzzTxt){
    let fizzBuzzArr = [];

    for (i = 0;i <= 100;i++) {
        //ternary operator
        let value = ((i % fizzVal == 0 ? fizzTxt : "") + (i % buzzVal == 0 ? buzzTxt : "") || i);
        fizzBuzzArr.push(value);
    }
    return fizzBuzzArr;
}

//Display values
function generateNumText(fizzBuzzArr, fizzT, buzzT){
    //sets empty array to insert
    let tableText = "";
    //used for table row tags
    let trStart = "";
    let trEnd = "";
    //used for table row numbers
    let iCount = getId("tableSlider").value;
    let iCountNum = 1;
    //sets colour class for table entries
    let colorClass = "";

    for (let i = 1;i <= fizzBuzzArr.length-1;i++){
        //sets the table row numbers
        if (iCount == 1){
            trStart = "<tr>";
            trEnd = "</tr>";
        } else if (iCountNum == 1){
            trStart = "<tr>";
            trEnd = "";
            iCountNum++;
        }else if (iCountNum >= iCount){
            trStart = "";
            trEnd = "</tr>";
            iCountNum = 1;
        } else {
            trStart = "";
            trEnd = "";
            iCountNum++;
        }
        //Checks how to display the FizzBuzz array
        colorClass = fizzBuzzArr[i];
        
        if (fizzBuzzArr[i] == fizzT + buzzT) {
            inum = `<span class="${fizzBuzzArr[i]}">${fizzBuzzArr[i]}</span>`;
            colorClass = "";
        } else if (fizzBuzzArr[i] == fizzT){
            inum = fizzBuzzArr[i];
        } else if (fizzBuzzArr[i] == buzzT){
            inum = fizzBuzzArr[i];
        } else {
            inum = fizzBuzzArr[i];
        }

        tableText += `${trStart}<td class="${colorClass}">${inum}</td>${trEnd}`;

    }

    getById("tableData").innerHTML = tableText;

}


/*ids used
    fizzVal         -   Target fizz number    
    buzzVal         -   Target buzz number
    btnSubmit       -   listen for button
    tableData       -   insert HTML here
    tableInfo       -   table slider view
    tableSlider     -   resize tables
    tableSliderVal  -   table numbers
*/