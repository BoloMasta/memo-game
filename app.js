const timeRemaining = document.querySelector("#time-remaining");
const pairs = document.querySelector("#pairs");
const cards = document.querySelectorAll(".card");
const imagesArray = [
  { icon: "💘", color: "#ec1c1c" },
  { icon: "🎃", color: "#fc6f03" },
  { icon: "🎈", color: "#9d03fc" },
  { icon: "📷", color: "#03fc1c" },
  { icon: "🔑", color: "#030bfc" },
  { icon: "🧲", color: "#03fcd3" },
];
let activeCards = [];

cards.forEach((card) =>
  card.addEventListener("click", () => {
    if (activeCards.length < 2) {
      card.classList.add("visible");
    }
  })
);

function shuffleColors() {
  const doubleArray = [...imagesArray, ...imagesArray];
  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * doubleArray.length);
    const randomImage = doubleArray[randomIndex];
    card.children[1].style.backgroundColor = randomImage.color;
    card.children[1].children[0].textContent = randomImage.icon;
    doubleArray.splice(randomIndex, 1);
  });
}

function startGame() {
  shuffleColors();
  let time = 60;
  let pairsFound = 0;
  let timeInterval = setInterval(() => {
    timeRemaining.textContent = time;
    pairs.textContent = pairsFound;
    if (time === 0) {
      clearInterval(timeInterval);
      alert("Game Over");
    }
    if (pairsFound === 6) {
      clearInterval(timeInterval);
      alert("You Win");
    }
    time--;
  }, 1000);

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      activeCards.push(card);
      if (activeCards.length === 2) {
        cards.forEach((card) => card.removeEventListener("click", () => {}));

        if (
          activeCards[0].children[1].textContent ===
          activeCards[1].children[1].textContent
        ) {
          activeCards = [];
          pairsFound++;
        } else {
          setTimeout(() => {
            activeCards.forEach((card) => card.classList.remove("visible"));
            activeCards = [];
          }, 1000);
        }
      }
    });
  });
}

startGame();
