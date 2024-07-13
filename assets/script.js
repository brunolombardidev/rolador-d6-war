document.getElementById('rollButton').addEventListener('click', function() {
    const diceCount = parseInt(document.getElementById('diceCount').value) || 1;
    const targetNumberInput = document.getElementById('targetNumber');
    const targetNumber = parseInt(targetNumberInput.value) || 6;
    const diceContainer = document.getElementById('diceContainer');
    const resultContainer = document.getElementById('result');
    
    diceContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    let results = [];
    let diceElements = [];

    for (let i = 0; i < diceCount; i++) {
        const dice = document.createElement('img');
        dice.classList.add('dice');
        dice.src = 'assets/img/face1.png';
        diceContainer.appendChild(dice);
        diceElements.push(dice);
    }

    diceElements.forEach((dice, index) => {
        rollDice(dice, results, index, diceCount, targetNumber, resultContainer);
    });
});

function rollDice(dice, results, index, diceCount, targetNumber, resultContainer) {
    let counter = 0;
    const rollInterval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6) + 1;
        dice.src = `assets/img/face${randomFace}.png`;
        counter++;
        if (counter > 15) {
            clearInterval(rollInterval);
            results[index] = randomFace;
            if (results.length === diceCount) {
                displayResults(results, targetNumber, resultContainer);
            }
        }
    }, 100);
}

function displayResults(results, targetNumber, resultContainer) {
    const resultTitle = document.createElement('div');
    resultTitle.textContent = 'Resultados:';
    resultContainer.appendChild(resultTitle);

    results.forEach((result, index) => {
        const resultItem = document.createElement('span');
        resultItem.classList.add('result-item');
        resultItem.textContent = result;

        if (result >= targetNumber) {
            resultItem.classList.add('green');
        } else if (result === 1) {
            resultItem.classList.add('red');
        }

        resultContainer.appendChild(resultItem);

        if (index < results.length - 1) {
            const comma = document.createElement('span');
            comma.textContent = ', ';
            resultContainer.appendChild(comma);
        }
    });
}
