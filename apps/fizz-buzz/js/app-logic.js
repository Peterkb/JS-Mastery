var displayArray = []
var fizzText = "Fizz";
var buzzText = "Buzz";

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
    // Can later be used to take in user chosen names
    fizzText = "Fizz";
    buzzText = "Buzz";

    //Check whether parsed values are integers if not display alert to user
    if (Number.isInteger(fizzValue) && Number.isInteger(buzzValue))
    {
        //Create and populate an array with FizzBuzz values which can then be displayed in a adjustable table without having to recreate the array each time
        displayArray = createArray(fizzValue, buzzValue, fizzText, buzzText);

        //Populate table with array data and remove hidden tags from results table
        displayTable(fizzText, buzzText);

        //Remove hidden class from table and table info
        getElementBy("id", "tableData").classList.remove("invisible", "d-none");
        getElementBy("id", "tableInfo").classList.remove("invisible", "d-none");

        // jump to results
        window.location.href = "#Results";
    }
    else
    {
        getElementBy("id", "tableInfo").classList.add("invisible", "d-none");
        getElementBy("id", "alert").classList.remove("d-none", "invisible");
    }
}

// Create and return an array of 100 numbers substituting values for Fizz or Buzz where appropriate
function createArray(fizzValue, buzzValue)
{
    let array = [];

    // Loop through 100 numbers an push into array either number of FizzBuzz value
    for (let i = 1;i <= 100;i++) {

        // Add Fizz, Buzz, or Both if numbers are divisible
        // If neither Fizz or Buzz is added set value to number of index
        let value = ((i % fizzValue == 0 ? fizzText : "") + (i % buzzValue == 0 ? buzzText : "") || i);

        array.push(value);
    }

    return array;
}

//Display values
function displayTable()
{
    //Reset Table
    let tableHtml = "";

    //Set table row tags
    let tableRowStart = "";
    let tableRowEnd = "";

    //used for table row numbers
    let columns = getElementBy("id", "tableSlider").value;
    let iCountNum = 1;    

    //Value that will be displayed
    let fizBuzzValue = ''

    //sets colour class for table entries
    let colorClass = "";
    console.log(displayArray);
    
    displayArray.map((element, index) => {

        //sets the table row numbers
        if (columns == 1)
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
        else if (iCountNum >= columns)
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
        colorClass = element;
        
        if (element == fizzText + buzzText) {
            fizBuzzValue = `<span class="${element}">${element}</span>`;
            console.log(element);
            colorClass = "";
        } else if (element == fizzText){
            fizBuzzValue = element;
        } else if (element == buzzText){
            fizBuzzValue = element;
        } else {
            fizBuzzValue = element;
        }

        tableHtml += `${tableRowStart}<td class="${colorClass}">${fizBuzzValue}</td>${tableRowEnd}`;

    })
    
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