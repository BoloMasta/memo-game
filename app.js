const modalStart = document.querySelector(".modal-start");
const modalWin = document.querySelector(".modal-win");
const modalLose = document.querySelector(".modal-lose");

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

  function addListeners(card) {
    if (card.classList.contains("visible")) {
      return;
    } else if (activeCards.length < 2) {
      activeCards.push(card);
      card.classList.add("visible");
    }

    if (activeCards.length === 2) {
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
  }

  // timer
  let timeInterval = setInterval(() => {
    timeRemaining.textContent = time;
    pairs.textContent = pairsFound;

    // lose
    if (time === 0) {
      clearInterval(timeInterval);
      cards.forEach((card) => card.classList.remove("visible"));
      modalLose.classList.add("display");
      modalLose.addEventListener("click", () => {
        modalLose.classList.remove("display");
        startGame();
      });
    }

    // win
    if (pairsFound === 6) {
      clearInterval(timeInterval);
      cards.forEach((card) => card.classList.remove("visible"));
      modalWin.classList.add("display");
      document.querySelector("#win-time").textContent = 60 - time;
      modalWin.addEventListener("click", () => {
        modalWin.classList.remove("display");
        startGame();
      });
    }
    time--;
  }, 1000);

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      addListeners(card);
    });
  });
}

modalStart.addEventListener("click", () => {
  modalStart.classList.remove("display");
  startGame();
});
