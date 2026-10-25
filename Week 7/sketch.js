// ===== 7주차: 사운드/이미지 파일 다루기 =====
// 학번: 2022111758  이름: 김경민

let bgImg;      // 배경 이미지
let popSound;   // 효과음

// preload: 그림·소리 파일을 미리 불러오기
function preload() {
  bgImg = loadImage('cosmos.jpg');     // 우주 배경 이미지
  popSound = loadSound('catch.mp3');   // 효과음
}

function setup() {
  createCanvas(500, 500);
  textSize(16);
}

function draw() {
  // 배경에 이미지 그리기 (화면 크기에 맞춤)
  image(bgImg, 0, 0, width, height);

  fill(255);
  text('클릭하면 소리가 나요!', 20, 30);
}

// 이벤트함수: 클릭하면 효과음 재생
function mousePressed() {
  popSound.play();
}