document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertBtn = document.getElementById("convertBtn");
    const result = document.getElementById("result");

    async function populateCurrencyOptions() {
        try {
            const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await response.json();

            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
            
            fromCurrency.value = "USD";
            toCurrency.value = "EUR";
        } 
        catch (error) {
            console.error("Error fetching currency data:", error);
        }
    }

    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || amount <= 0) {
            result.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            const data = await response.json();

            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);

            result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } 
        catch (error){
            console.error("Error converting currency:", error);
            result.textContent = "Error converting currency.";
        }
    }

    populateCurrencyOptions();
    convertBtn.addEventListener("click", convertCurrency);
});
