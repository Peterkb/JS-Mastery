function setSiteTheme()
{
    var setTheme = document.body;

    setTheme.classList.toggle("lights-off")

    if (setTheme.classList.contains("lights-off"))
    {
        console.log('Dark Mode');    
        theme = "DARK"
    }
    else
    {        
        console.log('Light Mode');
        theme = "LIGHT"
    }

    var theme;

    // save to local storage
    localStorage.setItem("SiteTheme", JSON.stringify(theme))

    console.log(document.getElementById("lights-toggle").value);
}

function setTheme()
{
    let toggle = document.getElementById("lights-toggle");
    console.log(toggle.checked);

    // console.log('this is running');
    let getTheme = JSON.parse(localStorage.getItem("SiteTheme"))

    // console.log(document.getElementById("lights-toggle").value);

    if (getTheme === "LIGHT")
    {
        // console.log('its detecting light mode');
        if (document.body.classList.contains("lights-off"))
        {
            toggle.checked = true
            document.body.classList.remove("lights-off")
        }
    }
}

setTheme()