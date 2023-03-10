// Global variables
var alertBox =  getElementBy("id", "alertBox");
var comparisonTable = getElementBy("id", "table");
var inputBox = getElementBy("id", "palindrome");

//Get String
function getString()
{
    // Hide result table and reset alert
    alertBox.classList.add("invisible", "d-none");
    comparisonTable.classList.add("d-none");
    alertBox.classList.remove("alert-danger");

    // Get user input
    let inputString = inputBox.value;

    //Logic Function
    //create string taking out special characters
    let palindromeResult = checkPalindrome(inputString);

    //Display Function
    displayResult(palindromeResult);
}

//Logic Function
function checkPalindrome(inputString)
{
    // Set letters to lower case and remove special characters and spaces
    inputString = inputString.toLowerCase();

    let regex = /[^a-z0-9]/gi;
    inputString = inputString.replace(regex,"");
    
    // Reverse string
    let reversedString = inputString.split("").reverse().join("");
    
    // Create and set object properties dependent on results.
    let palindromeResult = {};

    if (inputString == reversedString && inputString != ""){
        palindromeResult.alertBox = "alert-success",
        palindromeResult.alertHead = "Congratulations",
        palindromeResult.alertText = `Your reversed string: "${reversedString}" is a palindrome.`
        palindromeResult.comparison = false
        
    }
    else if (inputString == "")
    {
        palindromeResult.alertBox = "alert-danger",
        palindromeResult.alertHead = "Oh no, try again!",
        palindromeResult.alertText = "Nothing was entered, please enter some text."
        palindromeResult.comparison = false
    }
    else
    {
        palindromeResult.alertBox = "alert-danger",
        palindromeResult.alertHead = "Oh no, try again!",
        palindromeResult.alertText = `Your reversed string: "${reversedString}" is not a palindrome.`
        // Create comparison table
        palindromeResult.comparison = compareStrings(inputString, reversedString)
    }

    palindromeResult.reversed = reversedString;

    return palindromeResult;
}

function compareStrings(input, reversed)
{
    let comparison = ['', '']

    for (let i = 0; i < input.length; i++) {        
        if (input[i] == reversed[i]) {
            comparison[0] += `<span class="true">${input[i]}</span>`
            comparison[1] += `<span class="true">${reversed[i]}</span>`
        }
        else
        {
            comparison[0] += `<span class="false">${input[i]}</span>`
            comparison[1] += `<span class="false">${reversed[i]}</span>`
        }
    }

    return comparison
}

//Display results
function displayResult(palindromeResult){
    // Set Alert Type
    alertBox.classList.add(palindromeResult.alertBox);

    //Set Header and Message
    getElementBy("id", "alertHead").innerHTML = palindromeResult.alertHead;
    getElementBy("id", "alertText").innerHTML = palindromeResult.alertText;

    if (palindromeResult.comparison != false)
    {
        comparisonTable.classList.remove("d-none")
        getElementBy("id", "comparison1").innerHTML = palindromeResult.comparison[0];
        getElementBy("id", "comparison2").innerHTML = palindromeResult.comparison[1];
    }
    
    // Display Alert Box
    alertBox.classList.remove("invisible", "d-none");
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

// Event Listeners
inputBox.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getString()
        window.location.href = '#Results'
    }
})

/*  --ID's--
-- INPUT --
palindrome  -   Get user input string
btnSubmit   -   User submit button
-- OUTPUT --
alertBox    -   Target Alert Box (make visible/invisible)
alertHead   -   Change Alert Heading (Change heading)
alertText   -   target Alert Text (insert body text)
*/