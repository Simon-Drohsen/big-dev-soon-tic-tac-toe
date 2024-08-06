document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const gameScreen = document.getElementById("gameScreen");
    const newGameBtn = document.getElementById("newGameBtn");
    const cells = document.querySelectorAll("[data-cell]");
    const turnIndicator = document.getElementById("turnIndicator");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const playerIcons = {
        "X": "assets/icons/o.svg",
        "O": "assets/icons/x.svg"
    };

    newGameBtn.addEventListener("click", startGame);

    function startGame() {
        welcomeScreen.classList.remove("show");
        gameScreen.classList.add("show");
        resetBoard();
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove("win");
        });
        currentPlayer = "X";
        turnIndicator.innerHTML = `<img class="icon" src="${playerIcons[currentPlayer]}" alt="${currentPlayer} Icon">`;
    }

    function handleClick(event) {
        const cell = event.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (board[cellIndex] !== "") return;

        board[cellIndex] = currentPlayer;
        cell.innerHTML = `<img class="icon" src="${playerIcons[currentPlayer]}" alt="${currentPlayer} Icon">`;

        if (checkWin()) {
            setTimeout(() => {
                alert(currentPlayer + " wins!");
                resetBoard();
            }, 1);
        } else if (board.every(cell => cell !== "")) {
            setTimeout(() => {
                alert("It's a tie!");
                resetBoard();
            }, 1);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
        turnIndicator.innerHTML = `<img class="icon" src="${playerIcons[currentPlayer]}" alt="${currentPlayer} Icon">`;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
});
