// Predefined programs for the "Codes" popup
const programs = {
  "Flappy Bird": `
<html>
<head>
<style>
body {
  background: lightblue;
  overflow: hidden;
}
</style>
<script>
let bird;
let gameLoop;
let gravity = 1;
let velocity = 0;

document.addEventListener('keydown', function () {
  velocity = -10;
});

window.onload = function () {
  bird = document.getElementById('bird');
  gameLoop = setInterval(function () {
    velocity += gravity;
    bird.style.top = (parseInt(bird.style.top || 100) + velocity) + 'px';
  }, 20);
};
</script>
</head>
<body>
<div id="bird" style="position: absolute; top: 100px; left: 50px; width: 50px; height: 50px; background: yellow; border-radius: 50%;"></div>
</body>
</html>`,

  "Tic Tac Toe": `
<html>
<head>
<style>
table {
  width: 300px;
  height: 300px;
  border-collapse: collapse;
}
td {
  border: 2px solid black;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
}
</style>
<script>
let currentPlayer = 'X';
let gameOver = false;

function play(cell) {
  if (cell.innerText === '' && !gameOver) {
    cell.innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}
</script>
</head>
<body>
<table>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
</table>
</body>
</html>`,

  "Rise Up": `
<html>
<head>
<style>
body {
  margin: 0;
  overflow: hidden;
  background: black;
  color: white;
}
.circle {
  position: absolute;
  background: white;
  border-radius: 50%;
}
</style>
<script>
window.onload = function () {
  alert("Basic 'Rise Up' coming soon...");
};
</script>
</head>
<body>
</body>
</html>`
};

// Function to run the entered code
function runCode() {
  const htmlEditor = document.getElementById("html-code");
  const cssEditor = document.getElementById("css-code");
  const jsEditor = document.getElementById("js-code");

  const htmlCode = htmlEditor.value;
  const cssCode = `<style>${cssEditor.value}</style>`;
  const jsCode = `<script>${jsEditor.value}<\/script>`;

  const outputFrame = document.getElementById("output-frame");

  outputFrame.contentDocument.open();
  outputFrame.contentDocument.write(htmlCode + cssCode + jsCode);
  outputFrame.contentDocument.close();
}

// Function to show a popup
function showPopup(type) {
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupBody = document.getElementById('popup-body');

  if (type === "codes") {
      popupTitle.innerText = "Codes";
      popupBody.innerHTML = Object.keys(programs).map(function (program) {
          return `<button onclick="loadProgram('${program}')">${program}</button>`;
      }).join("<br>");
  } else if (type === "instructions") {
      popupTitle.innerText = "Instructions";
      popupBody.innerText = "Write and test your HTML, CSS, and JavaScript code here. Click 'Run Code' to see the output.";
  } else if (type === "about") {
      popupTitle.innerText = "About";
      popupBody.innerText = "Welcome to Code Playground! This tool helps you learn and test your coding skills in HTML, CSS, and JavaScript.";
  }

  popup.style.display = 'block';
  setTimeout(function () {
      popup.classList.add('show');
  }, 10);
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show');
  setTimeout(function () {
      popup.style.display = 'none';
  }, 300);
}

// Function to load a predefined program
function loadProgram(program) {
  if (programs[program]) {
      const code = programs[program];
      const htmlEditor = document.getElementById("html-code");
      const cssEditor = document.getElementById("css-code");
      const jsEditor = document.getElementById("js-code");

      htmlEditor.value = code;
      cssEditor.value = "";
      jsEditor.value = "";

      runCode();
      closePopup();
  }
}

// Update line numbers for text areas
function updateLineNumbers(editor, lineNumbersContainer) {
  const text = editor.value;
  const lines = text.split("\n");
  const lineNumbersHTML = lines.map(function (_, index) {
      return `<div class="line-number">${index + 1}</div>`;
  }).join("");
  lineNumbersContainer.innerHTML = lineNumbersHTML;
}

// Synchronize scrolling for line numbers
function syncScroll(editor, lineNumbersContainer) {
  lineNumbersContainer.scrollTop = editor.scrollTop;
}

// Attach event listeners to editors
function attachEditorListeners(editorId, lineNumbersId) {
  const editor = document.getElementById(editorId);
  const lineNumbersContainer = document.getElementById(lineNumbersId);

  editor.addEventListener("input", function () {
      updateLineNumbers(editor, lineNumbersContainer);
  });

  editor.addEventListener("scroll", function () {
      syncScroll(editor, lineNumbersContainer);
  });

  updateLineNumbers(editor, lineNumbersContainer);
}

// Initialize the editors
document.addEventListener("DOMContentLoaded", function () {
  attachEditorListeners("html-code", "html-line-numbers");
  attachEditorListeners("css-code", "css-line-numbers");
  attachEditorListeners("js-code", "js-line-numbers");
});
