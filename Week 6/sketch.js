// ===== 6주차: 키보드/마우스 제어 (그림판) =====
// 학번: 2022111758  이름: 김경민

let x = [], y = [], cols = [];   // 원들의 위치·색 배열
let count = 0;                   // 지금까지 찍은 원 개수
let currentColor;                // 지금 선택된 색

function setup() {
  createCanvas(500, 500);
  currentColor = color(255, 220, 0);   // color()로 노란색 만들어 저장
  textSize(14);
}

function draw() {
  background(30);

  // 저장된 원들 모두 그리기
  noStroke();
  for (let i = 0; i < count; i++) {
    fill(cols[i]);
    ellipse(x[i], y[i], 40, 40);
  }

  // 마우스를 누르고 있는 동안 미리보기 원 (mouseIsPressed)
  if (mouseIsPressed) {
    fill(currentColor);
    ellipse(mouseX, mouseY, 50, 50);
  }

  // 안내 글자
  fill(255);
  text('클릭: 원 그리기 / 1,2,3: 색 바꾸기 / c: 지우기', 20, 480);
  text('2022111758 Kim', 20, 30);
}

// 이벤트함수 1: 마우스를 클릭한 순간 실행
function mousePressed() {
  x[count] = mouseX;          // 클릭한 가로 위치 저장
  y[count] = mouseY;          // 클릭한 세로 위치 저장
  cols[count] = currentColor; // 지금 색 저장
  count++;                    // 개수 1 늘리기
}

// 이벤트함수 2: 키를 누른 순간 실행
function keyPressed() {
  if (key == '1') {
    currentColor = color(255, 80, 80);    // 빨강
  } else if (key == '2') {
    currentColor = color(80, 200, 120);   // 초록
  } else if (key == '3') {
    currentColor = color(80, 160, 255);   // 파랑
  } else if (key == 'c') {
    count = 0;                            // 원 다 지우기
  }
}
