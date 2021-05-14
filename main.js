const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
console.log("dlj;n")
const GAME_WIDTH = 650;
const GAME_HEIGHT = 650;
var count = 0;
var count1 = 100;
var count2 = 0;


const GAME_STATE = {
  lastTime: Date.now(),
  playerX: 0,
  playerY: 0,
  lasers: [],
  enemy: []
};

function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}



function createPlayer() {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  const $player = document.querySelector(".player");
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function init() {
  createPlayer();
}

function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    if (GAME_STATE.playerX != -10) {
      GAME_STATE.playerX -= 5;
      const $player = document.querySelector(".player");
      setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    if (GAME_STATE.playerX != 620) {
      GAME_STATE.playerX += 5;
      const $player = document.querySelector(".player");
      setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }
  }

  if (e.keyCode == KEY_CODE_SPACE) {
    let x1 = GAME_STATE.playerX + 70;
    let y1 = GAME_HEIGHT - 110;
    let p = document.querySelector(".game")
    const $element = document.createElement("div");
    $element.style.width = '5px';
    $element.style.height = '20px';
    $element.style.backgroundColor = 'green';
    p.appendChild($element);
    const laser = { x1, y1, $element };
    GAME_STATE.lasers.push(laser);
    console.log(GAME_STATE.lasers)
    setPosition($element, x1, y1);


  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.requestAnimationFrame(update);


function update(e) {
  const lasers = GAME_STATE.lasers;
  const enemy = GAME_STATE.enemy;
  let p = document.querySelector(".game")
  leser(lasers, enemy, p)
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
  enemy1(GAME_STATE.enemy, 1, p)
  GAME_STATE.enemy = GAME_STATE.enemy.filter(e => !e.isDead);

  // updatePlayer();
  window.requestAnimationFrame(update);
}


function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element1);
  enemy.isDead = true;
}

function leser(lasers, enemies, body) {

  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y1 -= 8;
    if (laser.y1 < -33) {
      destroyLaser(body, laser)
    }
    setPosition(laser.$element, laser.x1, laser.y1);
    const r1 = laser.$element.getBoundingClientRect();

    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (enemy.isDead) continue;
      const r2 = enemy.$element1.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        // Enemy was hit
        if(count < 20){
        count++;
        console.log(count)
        destroyEnemy(body, enemy);
        destroyLaser(body, laser);
        break;
        }
        else if(count2 > 20){
          destroyEnemy(body, enemy);
          destroyLaser(body, laser);
          alert("win :)")
          location.reload();
          break;
        }
        else {
          console.log("count2" +count2 )
          destroyLaser(body, laser);
          count2++;
          break;
        }
      }
    }
  }
}


function enemy1(enemys, num, body) {
  if (count < 20) {
    if (enemys.length < num) {
      let x2 = Math.floor(Math.random() * (463 - 0)) + 0;
      let y2 = 0;
      const $element1 = document.createElement("div");
      $element1.style.width = '50px';
      $element1.style.height = '20px';
      $element1.style.backgroundColor = 'red';
      body.appendChild($element1);
      const e = { x2, y2, $element1 };
      enemys.push(e);
      console.log(enemys)
      setPosition($element1, x2, y2);


    }
    for (let i = 0; i < enemys.length; i++) {
      const enemy = enemys[i];
      enemy.y2 += 1;
      if (enemy.y2 > 570) {
        body.removeChild(enemy.$element1);
        enemy.isDead = true;
        alert("You loss :(")
          location.reload();
      }
      setPosition(enemy.$element1, enemy.x2, enemy.y2);
    }
  }
  else {
    let x2 = Math.floor(Math.random() * (463 - 0)) + 0;
    if (enemys.length < 1) {
      let y2 = 0;
      const $element1 = document.createElement("div");
      $element1.style.width = '200px';
      $element1.style.height = '50px';
      $element1.style.backgroundColor = 'red';
      body.appendChild($element1);
      const e = { x2, y2, $element1 };
      enemys.push(e);
      console.log(enemys)
      setPosition($element1, x2, y2);
    }
    if(count1 > 100){
      const enemy = enemys[0];
        enemy.x2 = Math.floor(Math.random() * (463 - 0)) + 0;
      setPosition(enemy.$element1, enemy.x2, enemy.y2);
      count1 = 0
    }
    else{
      count1++;
    }

  }


}