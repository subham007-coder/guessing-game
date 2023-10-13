// DOM Selection

const max = document.querySelector(".input1")

const guess = document.querySelector(".input2")

const randomBtn = document.querySelector(".random_btn")

const guessBtn = document.querySelector(".guess_btn")

const changeText = document.querySelector("#changeText")

const changeTextOne = document.querySelector("#changeText-one")

const removeText = document.querySelector("#removeText")

const divTwo = document.querySelector("#divTwo")

const gameInfo = document.querySelector(".gameInfo")

const gameAni = document.querySelector("#winParty")


// Enter user max Number function
randomBtn.addEventListener("click", () => {

  const random = Math.floor(Math.random() * max.value) + 1;

  console.log(max.value);

  console.log(random);

  const makeNumber = Number(max.value);

  console.log(typeof makeNumber);

  if (max.value == "" || max.value == 0 || max.value == 1 || max.value == 2 || max.value == 3 || max.value == 4 || max.value == 5 || max.value == 6 || max.value == 7 || max.value == 8 || max.value == 9) {

    console.log("it's empty");

    const divOne = document.querySelector("#divOne").style.display = "flex"

    divTwo.style.display = "none"

    removeText.style.display = "none"

    changeTextOne.innerHTML = "Please Enter Minimum Two Digit Number"
  }


  else if (max.value == makeNumber) {

    const divOne = document.querySelector("#divOne").style.display = "none"

    const text = max.value;

    changeText.innerHTML = `Guessing Number Between ${text}`

    divTwo.style.display = "flex"
  }


  // guess button function
  guessBtn.addEventListener("click", () => {

    let inputInfo = document.querySelector(".inputInfo").innerHTML = "You Can Try 10 Times."

    if (random == guess.value) {

      gameInfo.innerHTML = `🎊Congrats!🎆🎊 You win random number is ${random}`;

      gameAni.style.display = "block";

      gameInfo.id = "style";

      gameInfo.style.display = "block"
    }

    if (guess.value < random) {
      console.log("Your Guess Number Was Too Low Please Try Again");

      gameInfo.innerHTML = "Your Guess Number Was Too Low😓. Please Enter A Large Number"
    } else if (guess.value > random) {
      gameInfo.innerHTML = "Your Guess Number Was Too Large 😣. Please Enter A Low Number"
    }

  })

})



let a = 0;

guessBtn.addEventListener("click", () => {

  a += 1;

  console.log(a);
 
  let clickCount = document.querySelector(".clickCount").innerHTML = a;

  setInterval(() => {


      if (a == 10) {


        console.log(guess.value);

        gameInfo.innerHTML = "Game Over😔. Your time Was End. Please Try Again.";

        divTwo.style.display = "none";
      }

  }, 1000);

})






// for win Animation

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

class confettiParticle {
  constructor() {
    this.x = Math.random() * W // x
    this.y = Math.random() * H - H // y
    this.r = randomFromTo(11, 33) // radius
    this.d = Math.random() * maxConfettis + 11
    this.color =
      possibleColors[Math.floor(Math.random() * possibleColors.length)]
    this.tilt = Math.floor(Math.random() * 33) - 11
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05
    this.tiltAngle = 0

    this.draw = function () {
      context.beginPath()
      context.lineWidth = this.r / 2
      context.strokeStyle = this.color
      context.moveTo(this.x + this.tilt + this.r / 3, this.y)
      context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5)
      return context.stroke()
    }
  }
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function () {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();