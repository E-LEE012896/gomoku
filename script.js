window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  const margin = 30;
  const cw = (ch = canvas.width = canvas.height = 600 + margin * 2);
  const row = 18;
  const rowSize = 600 / row;
  const stoneSize = 13;
  let count = 0;
  let btn1 = document.querySelector("#reload");
  let board = new Array(Math.pow(row + 1, 2)).fill(-1);
  let checkDirection = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ];
  const blackWinScreen = document.querySelector(".winShow1");
  const whiteWinScreen = document.querySelector(".winShow2");

  // reloading page
  btn1.addEventListener("click", () => {
    setTimeout(() => {
      location.reload();
    }, 100);
  });

  draw();

  let xyToIndex = (x, y) => {
    return x + y * (row + 1);
  };

  let indexToXy = (i) => {
    w = Math.sqrt(board.length);
    x = i % w;
    y = Math.floor(i / w);
    return [x, y];
  };

  // board
  function draw() {
    ctx.fillStyle = "#DEB887";
    ctx.fillRect(0, 0, cw, ch);
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < row; y++) {
        let w = (cw - margin * 2) / row;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(w * x + margin, w * y + margin, w, w);
      }
    }

    // points
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        ctx.fillStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(
          (3 + a) * rowSize + margin + a * 5 * rowSize,
          (3 + b) * rowSize + margin + b * 5 * rowSize,
          stoneSize / 3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }

  //drawing stones
  drawCircle = (x, y) => {
    draw();

    for (i = 0; i < board.length; i++) {
      let a = indexToXy(i)[0];
      let b = indexToXy(i)[1];

      if (board[xyToIndex(a, b)] == 1) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(
          a * rowSize + margin,
          b * rowSize + margin,
          stoneSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      if (board[xyToIndex(a, b)] == 2) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
          a * rowSize + margin,
          b * rowSize + margin,
          stoneSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    checkWin(x, y);
  };

  function checkWin(x, y) {
    let thisColor = board[xyToIndex(x, y)];

    for (k = 0; k < 4; k++) {
      winBlack = 1;
      winWhite = 1;
      // check stone's color
      for (j = 0; j < 2; j++) {
        for (i = 1; i < 5; i++) {
          let a = x + checkDirection[k + 4 * j][0] * i;
          let b = y + checkDirection[k + 4 * j][1] * i;
          if (board[xyToIndex(a, b)] == thisColor) {
            switch (thisColor) {
              case 1:
                winBlack++;
                break;
              case 2:
                winWhite++;
                break;
            }
          } else {
            break;
          }
        }
      }

      if (winBlack == 5) {
        winShow(1);
      }
      if (winWhite == 5) {
        winShow(2);
      }
    }
  }

  function winShow(x) {
    switch (x) {
      case 1:
        blackWinScreen.style.visibility = "visible";
        blackWinScreen.style.zIndex = 2;

        break;
      case 2:
        whiteWinScreen.style.visibility = "visible";
        whiteWinScreen.style.zIndex = 2;

        break;
    }
  }

  // mouse click check
  document.addEventListener("click", (e) => {
    if (e.target.id == "canvas") {
      let x = Math.round(Math.abs(e.offsetX - margin) / rowSize);
      let y = Math.round(Math.abs(e.offsetY - margin) / rowSize);
      console.log(e.offsetX, e.offsetY, x, y);
      if (
        e.offsetX > 10 &&
        e.offsetX < 640 &&
        e.offsetY > 10 &&
        e.offsetY < 640
      ) {
        if (board[xyToIndex(x, y)] != -1) {
        } else {
          count % 2 == 0
            ? (board[xyToIndex(x, y)] = 1)
            : (board[xyToIndex(x, y)] = 2);
          count++;
          drawCircle(x, y);
        }
      }
    }
  });
};
