const setOnline = () => {
    const handleCardSelection = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        const cards = container.querySelectorAll("li");
    
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                cards.forEach((c) => c.classList.remove("selected"));
                card.classList.add("selected");
                calculate();
            });
        });
    };
    
    handleCardSelection(".js1");
    handleCardSelection(".js2");
    
    const amountElement_one = document.getElementById('amount-one');
    const amountElement_two = document.getElementById('amount-two');
    const rateDisplay1 = document.querySelector('.change-p1');
    const rateDisplay2 = document.querySelector('.change-p2');
    
    function calculate(isReverse = false) {
        const currencyElement_one = document.querySelector('#currency-one .selected');
        const currencyElement_two = document.querySelector('#currency-two .selected');
        
        if (!currencyElement_one || !currencyElement_two) return;
    
        const currency_one = currencyElement_one.getAttribute('data-value');
        const currency_two = currencyElement_two.getAttribute('data-value');
        const apiKey = '062c035b4d65c68012ae5fc4';
    
        if (isReverse) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_two}`)
                .then(res => res.json())
                .then(data => {
                    const rate = data.conversion_rates[currency_one];
                    if (rate) {
                        amountElement_one.value = (amountElement_two.value * rate).toFixed(4);
                        rateDisplay1.innerHTML = `<p>1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}</p>`;
                        rateDisplay2.innerHTML = `<p>1 ${currency_two} = ${(1 / rate).toFixed(4)} ${currency_one}</p>`;
                    } else {
                        console.error("Invalid conversion rate or API error.");
                    }
                })
                .catch(err => {
                    console.error("API error: ", err);
                });
        } else {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_one}`)
                .then(res => res.json())
                .then(data => {
                    const rate = data.conversion_rates[currency_two];
                    if (rate) {
                        amountElement_two.value = (amountElement_one.value * rate).toFixed(4);
                        rateDisplay1.innerHTML = `<p>1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}</p>`;
                        rateDisplay2.innerHTML = `<p>1 ${currency_two} = ${(1 / rate).toFixed(4)} ${currency_one}</p>`;
                    } else {
                        console.error("Invalid conversion rate or API error.");
                    }
                })
                .catch(err => {
                    console.error("API error: ", err);
                });
        }
    }

    const connectionStatus = document.querySelector('#connection-status');

    connectionStatus.innerHTML = ``;
    
    
    amountElement_one.addEventListener('input', () => calculate(false)); 
    amountElement_two.addEventListener('input', () => calculate(true));  
    
    calculate();
};

const setOffline = () => {
    const handleCardSelection = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        const cards = container.querySelectorAll("li");
    
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                cards.forEach((c) => c.classList.remove("selected"));
                card.classList.add("selected");
                calculate();
            });
        });
    };
    
    handleCardSelection(".js1");
    handleCardSelection(".js2");

    const amountElement_one = document.getElementById('amount-one');
    const amountElement_two = document.getElementById('amount-two');
    const rateDisplay1 = document.querySelector('.change-p1');
    const rateDisplay2 = document.querySelector('.change-p2');

    function offlineCalculate(){
        const currencyElement_one = document.querySelector('#currency-one .selected');
        const currencyElement_two = document.querySelector('#currency-two .selected');

        if (!currencyElement_one || !currencyElement_two) return;
    
        const currency_one = currencyElement_one.getAttribute('data-value');
        const currency_two = currencyElement_two.getAttribute('data-value');

        if(currency_one === currency_two){
            const rate = document.querySelector('input');
            if (rate) {
                amountElement_one.value = (amountElement_two.value * rate).toFixed(4);
                rateDisplay1.innerHTML = `<p>1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}</p>`;
                rateDisplay2.innerHTML = `<p>1 ${currency_two} = ${(1 / rate).toFixed(4)} ${currency_one}</p>`;
            } else {
                console.error("Invalid conversion rate or API error.");
            }
        }
    }
    

    amountElement_one.addEventListener('input', () => offlineCalculate(false)); 
    amountElement_two.addEventListener('input', () => offlineCalculate(true));  
    
    offlineCalculate();

    const connectionStatus = document.querySelector('#connection-status');

    connectionStatus.innerHTML = `<p style="color: red;">No internet connection</p>`;
}


window.navigator.onLine ? setOnline() : setOffline();

window.addEventListener('online', setOnline);
window.addEventListener('offline', setOffline);

