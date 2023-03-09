function setLinks() {
    // Set Portfolio Link
    let links = getBy("class", "porfolioLink")
    console.log(links);

    for (const link of links) {
        link.href="https://portfolio-23-2.vercel.app/"
    }
    
}

setLinks()

//Shorten Code
function getBy(type, value)
{
    if(type === "id" || type === "id")
        return document.getElementById(value);
    
    if(type === 'class' || type === 'Class' || type === 'ClassName' || type === 'className')
        return document.getElementsByClassName(value);
    
    if(type === 'tag' || type === 'Tag' || type === 'TagName' || type === 'tagName')
        return document.getElementsByTagName(value);
}