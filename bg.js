const body = document.querySelector("body");

const IMG_NUMBER = 10;

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `images/${imageNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image); 
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();