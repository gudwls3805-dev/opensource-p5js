// ===== 5주차: 충돌 + 움직임 3가지(속도·가속도·진동) =====
// 학번: 2022111758  이름: 김경민

let ballX, ballY;      // 공 위치
let vx, vy;            // 공 속도 (x, y)
let gravity = 0.4;     // 중력(가속도)
let ballR = 25;        // 공 반지름

let targetX;           // 타겟 x (진동으로 계속 바뀜)
let targetY = 150;     // 타겟 y
let targetR = 35;      // 타겟 반지름
let baseX = 250;       // 진동 중심
let hit = false;       // 충돌했는지

function setup() {
  createCanvas(500, 500);
  ballX = 100;
  ballY = 100;
  vx = 3;              // 처음 가로 속도
  vy = 0;              // 처음 세로 속도
  textSize(18);
}

// draw는 함수 4개를 부르기만 함
function draw() {
  setBackground();   // 1. 배경
  moveBall();        // 2. 공 움직이기 (속도+가속도+충돌)
  moveTarget();      // 3. 타겟 움직이기 (진동)
  drawScene();       // 4. 그리기 (충돌 판정 포함)
}

// 1. 배경
function setBackground() {
  background(20, 20, 40);
}

// 2. 공 움직이기 — 속도 + 가속도 + 벽 충돌
function moveBall() {
  vy += gravity;     // 가속도: 중력으로 아래 속도가 점점 빨라짐
  ballX += vx;       // 속도: 가로로 이동
  ballY += vy;       // 속도: 세로로 이동

  // 좌우 벽 충돌 → 가로 방향 반대로
  if (ballX < ballR || ballX > width - ballR) {
    vx = -vx;
  }
  // 바닥 충돌 → 위로 튕기기
  if (ballY > height - ballR) {
    ballY = height - ballR;
    vy = -vy;
  }
  // 천장 충돌
  if (ballY < ballR) {
    ballY = ballR;
    vy = -vy;
  }
}

// 3. 타겟 움직이기 — 진동(sin으로 좌우 왕복)
function moveTarget() {
  targetX = baseX + sin(frameCount * 0.05) * 120;
}

// 4. 그리기 + 충돌 판정
function drawScene() {
  // 두 원의 중심 거리로 충돌 확인
  let d = dist(ballX, ballY, targetX, targetY);
  if (d < ballR + targetR) {
    hit = true;
  } else {
    hit = false;
  }

  // 타겟 (충돌하면 빨강, 아니면 초록)
  noStroke();
  if (hit) {
    fill(255, 80, 80);
  } else {
    fill(80, 200, 120);
  }
  ellipse(targetX, targetY, targetR * 2, targetR * 2);

  // 공
  fill(255, 220, 0);
  ellipse(ballX, ballY, ballR * 2, ballR * 2);

  // 글자
  fill(255);
  text('2022111758 Kim', 20, 30);
  if (hit) {
    text('HIT!', 240, 30);
  }
}
