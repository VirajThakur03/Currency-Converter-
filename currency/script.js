const api = "https://api.exchangerate-api.com/v4/latest/USD";
   
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom = 'USD'; // Default value
var resultTo = 'EUR'; // Default value
var searchValue = 1; // Default value
   
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});
   
toCurrecy.addEventListener('change', (event) => {
    resultTo = event.target.value;
});
   
search.addEventListener('input', updateValue);

function updateValue(e) {
    searchValue = e.target.value;
}
   
convert.addEventListener("click", getResults);

function getResults() {
    fetch(`${api}?base=${resultFrom}&symbols=${resultTo}`)
        .then(currency => currency.json())
        .then(displayResults)
        .catch(error => console.error('Error:', error));
}

function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

function clearVal() {
    finalValue.innerHTML = "";
}
