const timeRemaining = document.querySelector("#time-remaining");
const pairs = document.querySelector("#pairs");
const cards = document.querySelectorAll(".card");
const imagesArray = [
  { icon: "💘", color: "#ec1c1c" },
  { icon: "💘", color: "#ec1c1c" },
  { icon: "💘", color: "#ec1c1c" },
];

cards.forEach((card) =>
  card.addEventListener("click", () => {
    card.classList.toggle("visible");
  })
);
