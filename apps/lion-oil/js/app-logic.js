//Get String
function getString(){
    getElementBy("id", "alertBox").classList.add("invisible");
    getElementBy("id", "alertBox").classList.remove("alert-danger");

    let paliString = getElementBy("id", "paliString").value;

    //logic
    //create string taking out special characters
    let returnObj = checkForPali(paliString);

    //display
    displayPali(returnObj);
}

//Logic Functions
//String without special characters
function checkForPali(userString){
    
    userString = userString.toLowerCase();

    let regex = /[^a-z0-9]/gi;
    userString = userString.replace(regex,"");
    
    let revString = userString.split("").reverse().join("");
    
    let returnObj = {};

    if (userString == revString && userString != ""){
        returnObj.alertBox = "alert-success",
        returnObj.alertHead = "Congratulations",
        returnObj.alertText = `Your reversed string: "${revString}" is a palindrome.`
        
    } else if (userString == ""){
        returnObj.alertBox = "alert-danger",
        returnObj.alertHead = "Oh no, try again!",
        returnObj.alertText = "Nothing was entered, please enter some text."
    } else {
        returnObj.alertBox = "alert-danger",
        returnObj.alertHead = "Oh no, try again!",
        returnObj.alertText = `Your reversed string: "${revString}" is not a palindrome.`
    }

    returnObj.reversed = revString;

    return returnObj;
}

//Display results
function displayPali(returnObj){
    getElementBy("id", "alertBox").classList.add(returnObj.alertBox);
    getElementBy("id", "alertHead").innerHTML = returnObj.alertHead;
    getElementBy("id", "alertText").innerHTML = returnObj.alertText;
    
    getElementBy("id", "alertBox").classList.remove("invisible");
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

/*  --ID's--
-- INPUT --
paliString     -   Get user input string
btnSubmit   -   User submit button
-- OUTPUT --
alertBox    -   Target Alert Box (make visible/invisible)
alertHead   -   Change Alert Heading (Change heading)
alertText   -   target Alert Text (insert body text)
*/