const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;

const GAME_WIDTH = 650;
const GAME_HEIGHT = 650;
var count = 0;
var count1 = 100;
var count2 = 0;

var score = document.createElement("h3");
score.innerText = "0 / 50";
score.style.position= "absolute";
score.style.top= "8px";
score.style.left= "16px";
document.body.appendChild(score)

var scoreBoss = document.createElement("h3");


const GAME_STATE = {
  lastTime: Date.now(),
  playerX: 0,
  playerY: 0,
  lasers: [],
  lasersEnemy: [],
  block: [],
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
  var $player = document.querySelector(".player");
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
  let numberOfEnemys = 50;
  let numberOfBlock = 3;
  let p = document.querySelector(".game")
  leser(lasers, enemy, p , 18,numberOfEnemys)
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
  enemy1(GAME_STATE.enemy, 1, p,numberOfEnemys)
  GAME_STATE.enemy = GAME_STATE.enemy.filter(e => !e.isDead);

  block(GAME_STATE.block, numberOfBlock, p)
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

function leser(lasers, enemies, body,numberToKill,numberOfEnemys) {

  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y1 -= 8;
    if (laser.y1 < -100) {
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
        if (count < numberOfEnemys) {
          count++;
          
          
          score.innerText = count + " / 50";
          document.body.appendChild(score)

          destroyEnemy(body, enemy);
          destroyLaser(body, laser);
          break;
        }
        else if (count2 > numberToKill) {
          destroyEnemy(body, enemy);
          destroyLaser(body, laser);
          body.style.backgroundImage = "url('https://i.makeagif.com/media/10-13-2015/FymNEH.gif')"
          setTimeout(function () {
            alert("win :)")
            location.reload();
          }, 500);
          break;
        }
        else {
          console.log("count2" + count2)
          count2++;
          scoreBoss.innerText = count2 + " / 20";
          scoreBoss.style.color = "white"
         
          destroyLaser(body, laser);
          
          break;
        }
      }
    }
    for (let k = 0; k < GAME_STATE.block.length; k++) {
      const block = GAME_STATE.block[k];
      if (block.isDead) continue;
      const r2 = block.$element3.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        destroyLaser(body, laser);
        break;

      }
    }

  }
}


function enemy1(enemys, num, body, numberOfEnemys) {
  if (count < numberOfEnemys) {
    if (enemys.length < num) {
      let x2 = Math.floor(Math.random() * (463 - 5)) + 5;
      let y2 = 0;
      const $element1 = document.createElement("div");
      $element1.style.width = '60px';
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
      enemy.y2 += 1.5;
      if (enemy.y2 > 570) {
        body.removeChild(enemy.$element1);
        enemy.isDead = true;

        body.style.backgroundImage = "url('https://media0.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif')"
        setTimeout(function () {

          alert("You lose :(")
          location.reload();
        }, 700);

      }
      setPosition(enemy.$element1, enemy.x2, enemy.y2);

      const r1 = enemy.$element1.getBoundingClientRect();

      for (let j = 0; j < GAME_STATE.block.length; j++) {
        const block = GAME_STATE.block[j];
        if (block.isDead) continue;
        const r2 = block.$element3.getBoundingClientRect();
        if (rectsIntersect(r1, r2)) {
          destroyEnemy(body, enemy);
          break;

        }
      }
    }
  }
  else {
    let x2 = Math.floor(Math.random() * (463 - 0)) + 0;
    if (enemys.length < 1) {
      document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/d2/63/55/d26355a4484cf412669476a57a263abc.png')";
      scoreBoss.innerText = "0 / 20";
      scoreBoss.style.color = "white"
      scoreBoss.style.position= "absolute";
      scoreBoss.style.top= "8px";
      scoreBoss.style.left= "16px";

      document.body.appendChild(scoreBoss)
      let y2 = 0;
      const $element1 = document.createElement("div");
      $element1.style.width = '200px';
      $element1.style.height = '50px';
      $element1.style.backgroundColor = 'darkred';
      body.appendChild($element1);
      const e = { x2, y2, $element1 };
      enemys.push(e);
      console.log(enemys)
      setPosition($element1, x2, y2);
    }
     
    if (count1 > 100) {
      const enemy = enemys[0];
      enemy.x2 = Math.floor(Math.random() * (463 - 0)) + 0;
      setPosition(enemy.$element1, enemy.x2, enemy.y2);
      count1 = 0

     
  
      let y2 = 0;
      x2 += 100;
      let p = document.querySelector(".game")
      const $element5 = document.createElement("div");
      $element5.style.width = '5px';
      $element5.style.height = '20px';
      $element5.style.backgroundColor = 'red';
      p.appendChild($element5);
      const laser = { x2, y2, $element5 };
      GAME_STATE.lasersEnemy.push(laser);
      console.log(GAME_STATE.lasersEnemy)
      setPosition($element5, x2, y2);

  
    }
    else {
      count1++;

   
      for (let i = 0; i < GAME_STATE.lasersEnemy.length; i++) {
        const enemy = GAME_STATE.lasersEnemy[i];
        enemy.y2 += 3;
        if (enemy.y2 > 500) {
          body.removeChild(enemy.$element5);
          enemy.isDead = true;
  
        }
        setPosition(enemy.$element5, enemy.x2, enemy.y2);
        const r1 = enemy.$element5.getBoundingClientRect();
        const $player = document.querySelector(".player");
        const r2 = $player.getBoundingClientRect();
        if (rectsIntersect(r1, r2)) {
          body.style.backgroundImage = "url('https://media0.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif')"
          setTimeout(function () {
            // alert("Game Over :(");
            location.reload();
          }, 3000);
          break;
        }
  
        for (let j = 0; j < GAME_STATE.block.length; j++) {
          const block = GAME_STATE.block[j];
          if (block.isDead) continue;
          const r2 = block.$element3.getBoundingClientRect();
          if (rectsIntersect(r1, r2)) {
            body.removeChild(enemy.$element5);
            enemy.isDead = true;
            break;
  
          }
        }
  
  
      }
      GAME_STATE.lasersEnemy = GAME_STATE.lasersEnemy.filter(e => !e.isDead);
    }
    
    

  }


}


function block(block, numberOfBlock, body) {
  if (block.length < numberOfBlock) {
    let x3 = Math.floor(Math.random() * (463 - 5)) + 5;
    let y3 = Math.floor(Math.random() * (100 - 300)) + 300;
    const $element3 = document.createElement("div");
    $element3.style.width = '40px';
    $element3.style.height = '20px';
    $element3.style.backgroundColor = 'gray';
    body.appendChild($element3);
    const e = { x3, y3, $element3 };
    block.push(e);
    console.log(block)
    setPosition($element3, x3, y3);


  }
}