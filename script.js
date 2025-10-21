const board = document.getElementById("board");
const cell = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // colunas
    [0, 4, 8],
    [2, 4, 6], // diagonais
];

inicioGame();

function inicioGame() {
    cell.forEach((celula, index) => {
        celula.addEventListener("click", function() {
            // se o jogo nn estiver ativo ou celula ja estiver preenchida, ignora o clique
            if (!gameActive || gameState[index] !== "") {
                return;
            }

            // atualiza o estado e mostra no tabuleiro
            gameState[index] = currentPlayer;
            celula.textContent = currentPlayer;

            //vitoria
            let venceu = winningCombinations.some(combinacao =>
                combinacao.every(i => gameState[i] === currentPlayer)
            );

            if (venceu) {
                statusText.textContent = `Jogador ${currentPlayer} venceu!`;
                gameActive = false;
                return;
            }

            // empate
            if (gameState.every(c => c !== "")) {
                statusText.textContent = "Empate!";
                gameActive = false;
                return;
            }

            // troca jogador
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Vez do ${currentPlayer}`;
        });
    });

    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Vez do ${currentPlayer}`;
    gameActive = true;
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = Array(9).fill("");
    statusText.textContent = `Vez do ${currentPlayer}`;
    cell.forEach(celula => celula.textContent = "");
}
