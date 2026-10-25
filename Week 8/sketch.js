// ================================
// 주제명: DODGE! (피하기 게임)
// 주제설명: 위에서 떨어지는 장애물을 마우스로 피하는 게임.
//          오래 버틸수록 점수가 오르고 난이도가 1~10레벨로 올라간다.
// 학번: 2022111758
// 이름: 김경민
// ================================

let gameState = 0;
let playerX;
let playerY = 440;
let playerR = 20;

let obsX = [];
let obsY = [];
let obsSpeed = [];
let obsCount = 5;
let obsSize = 30;

let score = 0;
let level = 1;

let bgImg;
let overSound;

// p5.js 2.x: preload 대신 async setup에서 await로 불러옴
async function setup() {
  createCanvas(500, 500);
  playerX = width / 2;
  bgImg = await loadImage('cosmos.jpg');
  overSound = await loadSound('catch.mp3');
}

function draw() {
  switch (gameState) {
    case 0:
      drawStart();
      break;
    case 1:
      drawPlay();
      break;
    case 2:
      drawOver();
      break;
  }
}

// 시작 화면
function drawStart() {
  image(bgImg, 0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(34);
  text("DODGE!", width / 2, 200);
  textSize(16);
  text("Click to Start", width / 2, 260);
}

// 플레이 화면
function drawPlay() {
  image(bgImg, 0, 0, width, height);   // 이미지 배경

  // 달 (원호)
  fill(255, 255, 200);
  noStroke();
  arc(430, 70, 90, 90, 0, PI);

  // 땅 선 (선)
  stroke(120, 120, 160);
  strokeWeight(2);
  line(0, 475, width, 475);
  noStroke();

  score++;              // 점수 증가

  // 난이도 단계 이동: 점수가 레벨*120을 넘으면 레벨업 (최대 10)
  if (score >= level * 120 && level < 10) {
    level = level + 1;
  }
  let speedUp = (level - 1) * 1.8;     // 레벨 높을수록 빨라짐

  // 장애물들
  for (let i = 0; i < obsCount; i++) {
    obsY[i] += obsSpeed[i] + speedUp;
    if (obsY[i] > height) {
      obsY[i] = random(-100, 0);
      obsX[i] = random(width);
    }
    drawObstacle(obsX[i], obsY[i]);    // 사용자정의함수 유형2

    if (isHit(obsX[i], obsY[i])) {
      if (gameState == 1) {
        overSound.play();              // 부딪히면 효과음
      }
      gameState = 2;
    }
  }

  // 플레이어 (원 + 사용자정의도형)
  playerX = mouseX;
  drawPlayer();

  // 점수·레벨 글자 (레벨마다 color() 다르게)
  let levelColor;
  if (level < 4) {
    levelColor = color(100, 255, 100);   // 1~3 초록
  } else if (level < 7) {
    levelColor = color(255, 220, 0);      // 4~6 노랑
  } else {
    levelColor = color(255, 80, 80);      // 7~10 빨강
  }
  fill(levelColor);
  textAlign(LEFT, TOP);
  textSize(18);
  text("Score: " + score, 10, 10);
  text("Level: " + level, 10, 35);
}

// 게임오버 화면
function drawOver() {
  background(60, 20, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(34);
  text("GAME OVER", width / 2, 180);
  textSize(20);
  text("Score: " + score, width / 2, 230);
  text("Level: " + level, width / 2, 260);
  textSize(16);
  text("Click to Restart", width / 2, 300);
}

// 장애물·점수 초기화
function startGame() {
  score = 0;
  level = 1;
  for (let i = 0; i < obsCount; i++) {
    obsX[i] = random(width);
    obsY[i] = random(-400, 0);
    obsSpeed[i] = random(2, 5);
  }
}

// 사용자정의함수 유형2: 입력 있음, 반환 없음 (장애물 그리기)
function drawObstacle(ox, oy) {
  fill(255, 80, 80);
  noStroke();
  rect(ox, oy, obsSize, obsSize);        // 사각형
}

// 플레이어 그리기 (원 + 사용자정의도형)
function drawPlayer() {
  // 보호막 (원)
  noFill();
  stroke(0, 220, 255);
  strokeWeight(2);
  ellipse(playerX, playerY, playerR * 2 + 12, playerR * 2 + 12);
  // 우주선 (사용자정의도형)
  noStroke();
  fill(0, 220, 255);
  beginShape();
  vertex(playerX, playerY - playerR);
  vertex(playerX - playerR, playerY + playerR);
  vertex(playerX + playerR, playerY + playerR);
  endShape(CLOSE);
}

// 사용자정의함수 유형4: 입력 있음, 반환 있음 (충돌 판정)
function isHit(ox, oy) {
  let cx = ox + obsSize / 2;
  let cy = oy + obsSize / 2;
  let d = dist(playerX, playerY, cx, cy);
  if (d < playerR + obsSize / 2) {
    return true;
  } else {
    return false;
  }
}

// 이벤트함수 1: 마우스 클릭하면 시작/재시작
function mousePressed() {
  if (gameState == 0) {
    startGame();
    gameState = 1;
  } else if (gameState == 2) {
    startGame();
    gameState = 1;
  }
}

// 이벤트함수 2: R키 누르면 다시 시작
function keyPressed() {
  if (key == 'r' || key == 'R') {
    startGame();
    gameState = 1;
  }
}
