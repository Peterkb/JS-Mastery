//Controller function
function getValues()
{
    // clears alert
    getElementBy("id", "alert").classList.add("d-none", "invisible");
    // Resets table information
    getElementBy("id", "tableData").innerHTML = "";

    //Set fizz and buzz input values to variables and attempt to parse into integers
    let fizzValue = getElementBy("id", "fizzValue").value;
    fizzValue = parseInt(fizzValue);

    let buzzValue = getElementBy("id", "buzzValue").value;
    buzzValue = parseInt(buzzValue);

    //Sets name for Fizz and Buzz that can also be used as class names for CSS styling
    let fizzText = "Fizz";
    let buzzText = "Buzz";

    //Check whether parsed values are integers if not display alert to user
    if (Number.isInteger(fizzValue) && Number.isInteger(buzzValue))
    {
        //Create and populate an array with FizzBuzz values which can then be displayed in a adjustable table without having to recreate the array each time
        fizzBuzzArr = createArray(fizzValue, buzzValue, fizzText, buzzText);

        //Populate table with array data and remove hidden tags from results table
        displayTable(fizzBuzzArr ,fizzText, buzzText);

        //Remove hidden class from table and table info
        getElementBy("id", "tableData").classList.remove("invisible", "d-none");
        getElementBy("id", "tableInfo").classList.remove("invisible", "d-none");
    }
    else
    {
        getElementBy("id", "alert").classList.remove("d-none", "invisible");
    }
}

// Create and return an array of 100 numbers substituting values for Fizz or Buzz where appropriate
function createArray(fizzValue, buzzValue, fizzText, buzzText)
{
    let array = [];

    // Loop through 100 numbers an push into array either number of FizzBuzz value
    for (i = 0;i <= 100;i++) {

        // Add Fizz, Buzz, or Both if numbers are divisible
        // If neither Fizz or Buzz is added set value to number of index
        let value = ((i % fizzValue == 0 ? fizzText : "") + (i % buzzValue == 0 ? buzzText : "") || i);

        array.push(value);
    }

    return array;
}

//Display values
function displayTable(array, fizzT, buzzT)
{
    //Reset Table
    let tableHtml = "";

    //Set table row tags
    let tableRowStart = "";
    let tableRowEnd = "";

    //used for table row numbers
    let iCount = getElementBy("id", "tableSlider").value;
    let iCountNum = 1;

    //sets colour class for table entries
    let colorClass = "";

    for (let i = 1;i <= array.length-1;i++){
        //sets the table row numbers
        if (iCount == 1)
        {
            tableRowStart = "<tr>";
            tableRowEnd = "</tr>";
        }
        else if (iCountNum == 1)
        {
            tableRowStart = "<tr>";
            tableRowEnd = "";
            iCountNum++;
        }
        else if (iCountNum >= iCount)
        {
            tableRowStart = "";
            tableRowEnd = "</tr>";
            iCountNum = 1;
        }
        else
        {
            tableRowStart = "";
            tableRowEnd = "";
            iCountNum++;
        }

        //Set CSS class
        colorClass = array[i];
        
        if (array[i] == fizzT + buzzT) {
            inum = `<span class="${array[i]}">${array[i]}</span>`;
            colorClass = "";
        } else if (array[i] == fizzT){
            inum = array[i];
        } else if (array[i] == buzzT){
            inum = array[i];
        } else {
            inum = array[i];
        }

        tableHtml += `${tableRowStart}<td class="${colorClass}">${inum}</td>${tableRowEnd}`;

    }

    getElementBy("id", "tableData").innerHTML = tableHtml;

}

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


/*list of ids used in app.html
    fizzVal         -   Target fizz input
    buzzVal         -   Target buzz input
    btnSubmit       -   Target user submit button
    tableData       -   insert HTML here
    tableInfo       -   table slider view
    tableSlider     -   resize tables
    tableSliderVal  -   table numbers
*/