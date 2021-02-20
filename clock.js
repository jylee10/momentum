const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() { // 매번 init 함수 형식을 갖춰 생성
  getTime();
  setInterval(getTime, 1000);
}

init();