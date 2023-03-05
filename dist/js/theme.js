function setSiteTheme()
{
    var setTheme = document.body;

    setTheme.classList.toggle("lights-off")

    if (setTheme.classList.contains("lights-off"))
    { 
        theme = "DARK"
    }
    else
    {        
        theme = "LIGHT"
    }

    var theme;

    // save to local storage
    localStorage.setItem("SiteTheme", JSON.stringify(theme))
}

function setTheme()
{
    let toggle = document.getElementById("lights-toggle");

    let getTheme = JSON.parse(localStorage.getItem("SiteTheme"))


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