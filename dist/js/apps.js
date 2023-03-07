var app = {
    fizzBuzz: {
        Title: 'FizzBuzz',
        Path: 'fizz-buzz',
        Description: 'Get ready to FizzBuzz your way all the way to 100! Using loops, the numbers 1 to 100 is displayed using Fizz for multiples of 3, Buzz for multiples of 5, and FizzBuzz for multiples of both. It is a classic coding exercise that never gets old, click and start FizzBuzzing!',
        Button: ['Buzz Off!', 'Fizz out!', '1, 2, Fizz!', '3, 4, Buzz!']
    },
    lionOil: {
        Title: 'Lion Oil',
        Path: 'lion-oil',
        Description: 'Palindromes are often used in literature, poetry, and language puzzles. One of the most famous palindromic phrases is &#34;A man, a plan, a canal: Panama&#34;, which is a sentence that reads the same way forwards and backwards. Palindromes are fascinating linguistic curiosities that continue to capture the imaginations of people all over the world.',
        Button: ['Live Evil!', 'POP UP!', 'MEET TEEM!', 'Lion Oil!']
    },
    easyLoan: {
        Title: 'Easy Loan',
        Path: 'easy-loan',
        Description: 'Are you planning to take out a loan but want to know how much you will be paying back in total? Here is a loan calculator app that can help you! Simply enter the amount you want to borrow, the interest rate, and the duration of the loan, and thr app will calculate your monthly payment and the total amount you will pay back over the life of the loan.',
        Button: ['Lets Loan!', 'Loan away!', 'Take my Money!']
    },
    wordTrek : {
        Title: 'Word Trek',
        Path: 'word-trek',
        Description: 'Word Trek is a simple and easy-to-use app that helps you find the longest word in a given string of text. The longest word in English has 189,819 letters and takes 3 hours to pronounce. This is a technical term for the chemical composition of titin.',
        Button: ['Search Away!', 'Find it!']
    }
}

var heroImgDark = document.getElementById("heroImgDark")
var heroImgLight = document.getElementById("heroImgLight")

var AppTitle = document.getElementById("AppTitle")
var AppDescription = document.getElementById("AppDescription")
var AppButton = document.getElementById("AppRef")

var link = ''

function select(selection)
{
    let item = app[selection]

    if (document.body.classList.contains("lights-off"))
        heroImgDark.setAttribute('src', `/apps/${item.Path}/img/Hero-Dark.svg`);
    else
        heroImgLight.setAttribute('src', `/apps/${item.Path}/img/Hero-Light.svg`);
    
    link = `/apps/${item.Path}/app.html`
    AppTitle.innerHTML = item.Title
    AppDescription.innerHTML = item.Description
    AppButton.href = link

    let buttonText = item.Button[Math.floor(Math.random() * item.Button.length)]
    AppButton.innerHTML = buttonText == AppButton.innerHTML ? 'Lets Go!' : buttonText
}

window.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        window.location.href = link
    }
})