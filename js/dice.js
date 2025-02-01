document.getElementById('startGameBtn').addEventListener('click', startGame);
//document.getElementById('rollDiceBtn').addEventListener('click', rollDice);
document.getElementById('nextTurnBtn').addEventListener('click', nextTurn);
document.getElementById('useSpecialAbilityBtn').addEventListener('click', useSpecialAbility);
document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('diceModal').style.display = 'none';
});

let currentPlayerIndex = 0;
const players = [player1, player2];
let turnCount = 0;
let maxTurns = 5;
let specialAbillityUsed = false;

const playerAbilities = {
    1: 'increaseHitChance', //habilidade teste para o p1
    2: 'reduceOpponentDodge' // habilidade teste para o p2

}


function startGame() {
    // document.getElementById('turnIndicator').innerText = `Turno do Jogador ${currentPlayer}`;
    // document.getElementById('specialAbilityIndicator').style.display = 'block';
    currentPlayerIndex = 0;
    turnCount = 0;
    specialAbillityUsed = false;
    updateTurnIndicator();
    rollDice();
}


function nextTurn() {
    if (turnCount < maxTurns) {
        // document.getElementById('turnIndicator').innerText = `Turno do Jogador ${currentPlayer}`;
        // document.getElementById('specialAbilityIndicator').style.display = 'block';
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        specialAbillityUsed = false;
        updateTurnIndicator();
        rollDice();
    } else {
        document.getElementById('diceModal').style.display = 'none';
        alert('Jogo concluído!');
    }
}


function useSpecialAbility(){
    if (!specialAbillityUsed) {
        specialAbillityUsed = true;
        document.getElementById('specialAbilityIndicator').style.display = 'none';
        const currentPlayer = players[currentPlayerIndex];
        alert(`${currentPlayer.name} usou habilidade especial`);
                //Efeito da habilidade.
        if (playerAbilities[currentPlayerIndex + 1] === 'increaseHitChance') {
            currentPlayer.attributes.control -= 1; //Exemplo para diminuição de atributo.
        } else if (playerAbilities[currentPlayerIndex + 1] === 'reduceOpponentDoge'){
            // Reduzir chance de esquiva de oponent
            opponentDogeChance -= 0.1;
        }else{
            alert('Habilidade especial já foi usada neste turno.');
        }
    }    
}

function rollDice() {
    //let rolls = 5;
    //let attribute = 4; //Settando um valor manualmente.
    const currentPlayer = players[currentPlayerIndex];
    let redDiceCrits = 0;
    let attribute = currentPlayer.attributes.control; // RECUPERANDO UM ATRIBUTO REAL DA FICHA DA CLASSE CHARSET.
    let success = false;
    let hits = 0; // acertos
    let opponentDodgeChance = 0.3;

    for (let i = 0; i < maxTurns; i++) {
        setTimeout(() => {
            if (success) return;

            let redDice = Math.floor(Math.random() * 6) + 1;
            let whiteDice = Math.floor(Math.random() * 6) + 1;

            document.getElementById('dice1').innerText = redDice;
            document.getElementById('dice2').innerText = whiteDice;

            if (redDice === 1) {
                redDiceCrits++;
                hits = 0;
            } else if (redDice >= attribute) {
                if (redDiceCrits > 0) {
                    redDiceCrits--;
                } else {
                    hits++;
                }
            }

            if (redDice === 6 && whiteDice === 6) {
                redDiceCrits = 0;
                success = true;
                console.log('Sucesso!');
            }

            document.getElementById('diceModal').style.display = 'block';

            if (i === maxTurns - 1 || success) {
                let resultMessage = `Críticos acumulados: ${redDiceCrits}\nAcertos: ${hits}`;
            }

            if (success) {
                resultMessage = 'Ação bem-sucedida sem possibilidade de esquiva!';
            } else if (hits > 0) {
                resultMessage = handleOpponentDodge(hits);
            } else if (redDiceCrits > 0) {
                resultMessage = `Ação falhou devido a críticos acumulados.`;
            } else {
                resultMessage = 'Ação falhou. \nAcertos: ${hits}';
            }

            document.getElementById('resultMessage').innerText = resultMessage;

            setTimeout(() => {
                document.getElementById('diceModal').style.display = 'none';
                turnCount++;
                if (turnCount < maxTurns) {
                    nextTurn();
                } else {
                    alert('Jogo concluído!');
                }
            }, 2000); // Fechar o modal após 2 segundos.

        }, i * 1000); // Atraso de 1 segundo entre cada jogada.
    }
}

function handleOpponentDodge(hits, opponentDodgeChance){
    let dodgeResults = [];
    for (let j = 0; j < hits; j++) {
        let opponentRedDice = Math.floor(Math.random() * 6) + 1;
        let opponentWhiteDice = Math.floor(Math.random() * 6) + 1;

        if (opponentRedDice === 6 && opponentWhiteDice === 6) {
            dodgeResults.push('Oponente esquivou com sucesso!');
        }else if (opponentRedDice >= 4) { //
            dodgeResults.push('Oponente esquivou!');
        } else {
            dodgeResults.push('Ação bem-sucedida contra o oponente!');
        }
    }
    return dodgeResults.join('\n');
}

function updateTurnIndicator(){
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('turnIndicator').innerText = `Turno do Jogador ${currentPlayerIndex + 1} (${currentPlayer.name})`;
}
