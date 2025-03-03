let input, slider, button, dropdown;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('HOLA'); // 預設顯示HOLA
  input.position(10, 10);
  slider = createSlider(28, 50, 32); // 滑桿，範圍從28到50，預設值為32
  slider.position(input.x + input.width + 10, 10);
  button = createButton('Bounce');
  button.position(slider.x + slider.width + 10, 10);
  button.mousePressed(toggleBounce);
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周');
  dropdown.changed(handleDropdownChange);
  textStyle(BOLD); // 設置粗體字
  textFont('Arial'); // 設置字體為Arial，支持表情符號
}

function draw() {
  background(173, 216, 230); // 更淡的天藍色背景
  let txt = input.value();
  let spacedTxt = txt.split('').join(' ').trim(); // 去掉首尾空格
  textAlign(CENTER, CENTER);
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  fill(105, 105, 105); // 淺一點的黑色字體
  let textWidthWithSpacing = textWidth(spacedTxt) + 40;
  for (let y = 100; y < height; y += 40) { // 從Y軸座標100開始
    for (let x = 0; x < width; x += textWidthWithSpacing) {
      let yOffset = 0;
      if (isBouncing) {
        if (offsets.length < spacedTxt.length) {
          offsets = Array.from({ length: spacedTxt.length }, () => random(0.05, 0.15));
        }
        yOffset = sin(frameCount * offsets[(x / textWidthWithSpacing) % spacedTxt.length]) * 20;
      }
      text(spacedTxt, x, y + yOffset);
    }
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '第一周') {
    window.open('https://www.tku.edu.tw', '_blank');
  } else if (selected === '第二周') {
    window.open('https://www.et.tku.edu.tw', '_blank');
  } else if (selected === '第三周') {
    window.open('https://hackmd.io/@HNe8Dm5ZTiC8ZzA_UdZ_NQ/BJjqQtMsyl', '_blank');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
