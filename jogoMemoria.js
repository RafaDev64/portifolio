document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('memoryGame');
    const playerScoreDisplay = document.getElementById('playerScore');
    const machineScoreDisplay = document.getElementById('machineScore');
    const cardsArray = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];
    let flippedCards = [];
    let matchedPairs = 0;
    let playerScore = 0;
    let machineScore = 0;
    let isPlayerTurn = true;
    let machineMemory = {}; // Memória da máquina para cartas vistas

    // Atualizar pontuação na tela
    function updateScore(points, isPlayer) {
        if (isPlayer) {
            playerScore += points;
            playerScoreDisplay.textContent = playerScore;
        } else {
            machineScore += points;
            machineScoreDisplay.textContent = machineScore;
        }
    }

    // Embaralhar as cartas
    cardsArray.sort(() => 0.5 - Math.random());

    // Criar as cartas dinamicamente
    cardsArray.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = symbol;

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = '?';

        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });

    // Função para virar a carta jogadorn humano
    function flipCard() {
        if (!isPlayerTurn || flippedCards.length >= 2 || this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        flippedCards.push(this);
        machineMemory[this.dataset.index] = this.dataset.symbol; // Máquina ve a carta

        if (flippedCards.length === 2) {
            checkMatch(true);
            setTimeout(machineTurn, 1500); // Máquina depois do jogador
        }
    }

    // Verificar se as cartas combinam
    function checkMatch(isPlayer) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            updateScore(50, isPlayer); // +50 pontos por par
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cardsArray.length / 2) {
                setTimeout(() => endGame(), 500);
            }
        } else {
            updateScore(-10, isPlayer); // -10 pontos por erro
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                if (isPlayer) isPlayerTurn = false; // Passa a vez para a máquina
            }, 1000);
        }
    }

    // vez da máquina
    function machineTurn() {
        if (!isPlayerTurn || matchedPairs === cardsArray.length / 2) {
            isPlayerTurn = true;
            return;
        }

        const unflippedCards = Array.from(document.querySelectorAll('.memory-card:not(.flipped)'));
        let card1, card2;

        // Procurar um pa conhecido na memória da máquina
        const knownPairs = Object.entries(machineMemory);
        for (let i = 0; i < knownPairs.length; i++) {
            for (let j = i + 1; j < knownPairs.length; j++) {
                if (knownPairs[i][1] === knownPairs[j][1]) {
                    card1 = unflippedCards.find(card => card.dataset.index === knownPairs[i][0]);
                    card2 = unflippedCards.find(card => card.dataset.index === knownPairs[j][0]);
                    if (card1 && card2) break;
                }
            }
            if (card1 && card2) break;
        }

        // Se não houver par conhecido, escolher aleatoriamente
        if (!card1 || !card2) {
            card1 = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
            unflippedCards.splice(unflippedCards.indexOf(card1), 1);
            card2 = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
        }

        // Máquina vira as cartas
        flippedCards = [card1, card2];
        card1.classList.add('flipped');
        machineMemory[card1.dataset.index] = card1.dataset.symbol;
        setTimeout(() => {
            card2.classList.add('flipped');
            machineMemory[card2.dataset.index] = card2.dataset.symbol;
            checkMatch(false);
            isPlayerTurn = true; // Devolve ao jogador
        }, 1000);
    }

    // Fim  jogo
    function endGame() {
        const winner = playerScore > machineScore ? 'Jogador' : 'Máquina';
        alert(`Fim de jogo! Vencedor: ${winner}\nJogador: ${playerScore} | Máquina: ${machineScore}`);
    }
});