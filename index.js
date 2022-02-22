const st = document.querySelector('#start');
const ge = document.querySelector('#game');
const te = document.querySelector('#time');
const th = document.querySelector('#time-header');
const rh = document.querySelector('#result-header');
const rt = document.querySelector('#result');
const gt = document.querySelector('#game-time');

const colors = [
  '#DC143C',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#FF00FF',
  '#00FF00',
];
let score = 0;
let gameOn = false;

st.addEventListener('click', startGame);
ge.addEventListener('click', handleSquareClick);
gt.addEventListener('input', timeGameSquare);

function show(et) {
  et.classList.remove('hide');
}

function hide(et) {
  et.classList.add('hide');
}

function startGame() {
  score = 0;
  gt.setAttribute('disabled', 'true');
  timeGameSquare();
  gameOn = true;
  ge.style.backgroundColor = '#fff';
  hide(st);
  const interval = setInterval(function () {
    let time = parseFloat(te.textContent);
    if (time <= 0) {
      clearInterval(interval);
      gameOff();
    } else {
      te.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderSquare();
}

function scoreGameSquare() {
  rt.textContent = score.toString();
}

function timeGameSquare() {
  const toTime = +gt.value;
  te.textContent = toTime.toFixed(1);
  show(th);
  hide(rh);
}

function gameOff() {
  gameOn = false;
  scoreGameSquare();
  gt.removeAttribute('disabled');
  show(st);
  ge.innerHTML = '';
  ge.style.backgroundColor = '#ccc';
  hide(th);
  show(rh);
}

function handleSquareClick(event) {
  if (!gameOn) {
    return;
  }

  if (event.target.dataset.square) {
    score++;
    renderSquare();
  }
}

function renderSquare() {
  ge.innerHTML = '';
  let square = document.createElement('div');
  let squareSize = wbr(30, 120);
  const playingFieldSize = ge.getBoundingClientRect();
  const maxTop = playingFieldSize.height - squareSize;
  const maxLeft = playingFieldSize.width - squareSize;
  const randomColor = wbr(0, colors.length);

  square.style.height = square.style.width = squareSize + 'px';
  square.style.backgroundColor = colors[randomColor];
  square.style.top = wbr(0, maxTop) + 'px';
  square.style.left = wbr(0, maxLeft) + 'px';
  square.style.position = 'absolute';
  square.style.cursor = 'pointer';
  square.setAttribute('data-square', 'true');
  ge.insertAdjacentElement('afterbegin', square);
}

function wbr(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
