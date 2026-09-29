({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "index.html" }, // Located in project root
});

const MAX_SQUARES_PER_SIDE = 100;
let currentSize = 16;

const title = document.createElement("h1");
title.textContent = "Etch-A-Sketch";

const controls = document.createElement("div");
controls.classList.add("controls");

const newGridBtn = document.createElement("button");
newGridBtn.id = "newGridBtn";
newGridBtn.textContent = "New Grid";

const clearBtn = document.createElement("button");
clearBtn.classList.add("secondary");
clearBtn.textContent = "Clear";

const container = document.createElement("div");
container.id = "container";

controls.append(newGridBtn, clearBtn);
document.body.append(title, controls, container);

// ---------- Grid creation ----------
function createGrid(size) {
  size = 16;
  container.replaceChildren();
  for (let i = 0; i < 16 * 16; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.count = 0;

    square.addEventListener("mouseover", handleHover);
    container.appendChild(square);
  }
}
function handleHover(e) {
  const square = e.target;
  let count = Number(square.dataset.count);
  if (count < 10) {
    count++;
    square.dataset.count = count;
  }

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${count / 10})`;
}

newGridBtn.addEventListener("click", () => {
  const input = prompt(
    `Squares per side (1-${MAX_SQUARES_PER_SIDE}):`,
    currentSize,
  );
  if (input === null) return;

  const size = parseInt(input, 10);
  if (isNaN(size) || size < 1 || size > MAX_SQUARES_PER_SIDE) {
    alert(`Please enter a number between 1 and ${MAX_SQUARES_PER_SIDE}.`);
    return;
  }

  createGrid(size);
});

clearBtn.addEventListener("click", () => createGrid(currentSize));
createGrid(currentSize);
