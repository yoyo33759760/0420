let circles = [];
let subMenuVisible = false; // 子選單是否可見的狀態
let iframeContainer; // 用來存放 iframe 的容器

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeCircles(); // 初始化愛心
  createButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  initializeCircles(); // 重新初始化愛心
}

function draw() {
  background('#ffe6a7'); // 畫布顏色

  // 計算愛心大小變化幅度
  let sizeOffset = map(mouseX, 0, width, 20, 80);

  // 繪製所有愛心
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    drawHeart(circle.x, circle.y, circle.size + sizeOffset);
  }
}

// 初始化愛心的函式
function initializeCircles() {
  circles = []; // 清空現有的愛心
  let numCircles = floor((width * height) / 5000); // 根據畫布大小計算愛心數量
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width), // 愛心的 x 座標
      y: random(height), // 愛心的 y 座標
      size: random(30, 50), // 愛心的初始大小
      color: color(random(255), random(255), random(255)) // 愛心的顏色
    });
  }
}

// 繪製愛心的函式
function drawHeart(x, y, size) {
  beginShape();
  let topCurveHeight = size * 0.3;
  vertex(x, y + size * 0.25);
  bezierVertex(x - size / 2, y - topCurveHeight, x - size, y + size * 0.5, x, y + size);
  bezierVertex(x + size, y + size * 0.5, x + size / 2, y - topCurveHeight, x, y + size * 0.25);
  endShape(CLOSE);
}

// 建立按鈕的函式
function createButtons() {
  const buttonLabels = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  const buttonContainer = createDiv(); // 建立一個容器來放按鈕
  buttonContainer.style('position', 'absolute');
  buttonContainer.style('top', '10px');
  buttonContainer.style('left', '10px');
  buttonContainer.style('display', 'flex');
  buttonContainer.style('flex-direction', 'column');
  buttonContainer.style('gap', '10px'); // 按鈕之間的間距

  // 建立每個按鈕
  for (let label of buttonLabels) {
    let button = createButton(label);
    button.style('padding', '10px 20px');
    button.style('font-size', '18px');
    button.style('border', '1px solid #ccc');
    button.style('border-radius', '5px');
    button.style('background-color', '#fff');
    button.style('color', '#333');
    button.style('cursor', 'pointer');
    button.style('transition', 'background-color 0.3s'); // 平滑過渡效果

    // 滑鼠移入時變紅色
    button.mouseOver(() => {
      button.style('background-color', 'red');
      button.style('color', '#fff');
    });

    // 滑鼠移出時恢復原樣
    button.mouseOut(() => {
      button.style('background-color', '#fff');
      button.style('color', '#333');
    });

    // 點擊事件
    button.mousePressed(() => {
      console.log(`${label} 被點擊`);
      if (label === '作品集') {
        toggleSubMenu(); // 點擊「作品集」時切換子選單顯示/隱藏
      } else if (label === '測驗卷') {
        showIframe('https://yoyo33759760.github.io/0310-1/');
      } else if (label === '教學影片') {
        showIframe('https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week1/20250217_095228.mp4');
      } else if (label === '自我介紹') {
        showIframe('https://yoyo33759760.github.io/me/');
      }
    });

    buttonContainer.child(button); // 將按鈕加入容器
  }
}

// 切換子選單顯示/隱藏的函式
function toggleSubMenu() {
  if (subMenuVisible) {
    // 如果子選單已顯示，則移除子選單
    const existingSubMenu = select('#subMenuContainer');
    if (existingSubMenu) {
      existingSubMenu.remove();
    }
    subMenuVisible = false;
  } else {
    // 如果子選單未顯示，則建立子選單
    createSubMenu();
    subMenuVisible = true;
  }
}

// 建立子選單的函式
function createSubMenu() {
  const subMenuContainer = createDiv(); // 建立子選單容器
  subMenuContainer.id('subMenuContainer'); // 設定子選單的 ID
  subMenuContainer.style('position', 'absolute');
  subMenuContainer.style('top', '10px'); // 子選單位置與主選單對齊
  subMenuContainer.style('left', '200px'); // 子選單顯示在主選單右側
  subMenuContainer.style('display', 'flex');
  subMenuContainer.style('flex-direction', 'column');
  subMenuContainer.style('gap', '5px'); // 子選單項目間距

  const subMenuLabels = ['W1', '期中筆記', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9'];

  for (let label of subMenuLabels) {
    let subButton = createButton(label);
    subButton.style('padding', '5px 15px');
    subButton.style('font-size', '16px');
    subButton.style('border', '1px solid #ccc');
    subButton.style('border-radius', '5px');
    subButton.style('background-color', '#fff');
    subButton.style('color', '#333');
    subButton.style('cursor', 'pointer');
    subButton.style('transition', 'background-color 0.3s');

    // 滑鼠移入時變紫色
    subButton.mouseOver(() => {
      subButton.style('background-color', 'purple');
      subButton.style('color', '#fff');
    });

    // 滑鼠移出時恢復原樣
    subButton.mouseOut(() => {
      subButton.style('background-color', '#fff');
      subButton.style('color', '#333');
    });

    // 點擊事件
    subButton.mousePressed(() => {
      console.log(`${label} 被點擊`);
      if (label === 'W1') {
        showIframe('https://yoyo33759760.github.io/0303-1/'); // 顯示 iframe，載入指定網址
      } else if (label === '期中筆記') {
        showIframe('https://hackmd.io/@ohyrLVUdTXeemUyQIuvSmg/S187moMylg'); // 顯示 iframe，載入期中筆記網址
      }
    });

    subMenuContainer.child(subButton); // 將子按鈕加入子選單容器
  }
}

// 顯示 iframe 的函式
function showIframe(url) {
  // 如果已經有 iframe，則移除
  if (iframeContainer) {
    iframeContainer.remove();
    iframeContainer = null; // 清空 iframeContainer
    return; // 結束函式，避免重新建立 iframe
  }

  // 建立 iframe 容器
  iframeContainer = createDiv();
  iframeContainer.style('position', 'absolute');
  iframeContainer.style('top', '50%');
  iframeContainer.style('left', 'calc(300px + 10px)'); // 子選單寬度200px + 間距10px
  iframeContainer.style('transform', 'translateY(-50%)'); // 垂直居中
  iframeContainer.style('width', '70%'); // 調整寬度
  iframeContainer.style('height', '80%');
  iframeContainer.style('border', '2px solid #ccc');
  iframeContainer.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
  iframeContainer.style('background-color', '#fff');
  iframeContainer.style('z-index', '1000');

  // 建立 iframe 元素
  const iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');

  // 將 iframe 加入容器
  iframeContainer.child(iframe);

  // 建立關閉按鈕
  const closeButton = createButton('關閉');
  closeButton.style('position', 'absolute');
  closeButton.style('top', '10px');
  closeButton.style('right', '10px');
  closeButton.style('padding', '5px 10px');
  closeButton.style('background-color', 'red');
  closeButton.style('color', '#fff');
  closeButton.style('border', 'none');
  closeButton.style('border-radius', '5px');
  closeButton.style('cursor', 'pointer');
  closeButton.mousePressed(() => {
    iframeContainer.remove(); // 移除 iframe 容器
    iframeContainer = null; // 清空 iframeContainer
  });

  iframeContainer.child(closeButton);

  // 將 iframe 容器加入畫布
  document.body.appendChild(iframeContainer.elt);
}