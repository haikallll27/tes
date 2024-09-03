const emojis = [
    "😋", "😋", "🤕", "🤕",
    "🙃", "🙃", "😉", "😉",
    "😢", "😢", "😳", "😳",
    "🫤", "🫤", "😆", "😆"
];
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});

function initializeGame() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = '';
    attempts = 0;
    document.getElementById("attempts").innerText = attempts;
    let shuffledEmojis = shuffleArray([...emojis]);
    
    shuffledEmojis.forEach(emoji => {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;
        
        box.onclick = function() {
            handleBoxClick(this);
        };

        gameContainer.appendChild(box);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function handleBoxClick(box) {
    if (!box.classList.contains("boxOpen")) {
        attempts += 1;
        document.getElementById("attempts").innerText = attempts;
        box.classList.add("boxOpen");

        let openBoxes = document.querySelectorAll(".boxOpen:not(.boxMatch)");
        if (openBoxes.length === 2) {
            setTimeout(() => {
                if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                    openBoxes[0].classList.add("boxMatch");
                    openBoxes[1].classList.add("boxMatch");
                }
                openBoxes[0].classList.remove("boxOpen");
                openBoxes[1].classList.remove("boxOpen");

                if (document.querySelectorAll(".boxMatch").length === emojis.length) {
                    alert("You win!");
                }
            }, 500);
        }
    }
}

function resetGame() {
    initializeGame();
}
