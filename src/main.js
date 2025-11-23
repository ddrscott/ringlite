const { getCurrentWindow } = window.__TAURI__.window;
const { exit } = window.__TAURI__.process;
const { invoke } = window.__TAURI__.core;

// Ring state
const DEFAULT_SIZE = 400;
const MIN_SIZE = 100;
const MAX_SIZE = 1600;
const SIZE_STEP = 20;
const NUDGE_STEP = 10;

let ringSize = loadSavedSize();
let ringThickness = ringSize * 0.1;
let ringX = loadSavedPosition().x;
let ringY = loadSavedPosition().y;

function loadSavedSize() {
  const saved = localStorage.getItem('ringSize');
  if (saved) {
    const size = parseInt(saved, 10);
    if (size >= MIN_SIZE && size <= MAX_SIZE) {
      return size;
    }
  }
  return DEFAULT_SIZE;
}

function loadSavedPosition() {
  const savedX = localStorage.getItem('ringX');
  const savedY = localStorage.getItem('ringY');
  return {
    x: savedX ? parseInt(savedX, 10) : window.innerWidth / 2,
    y: savedY ? parseInt(savedY, 10) : window.innerHeight / 2
  };
}

function saveSize() {
  localStorage.setItem('ringSize', ringSize.toString());
}

function savePosition() {
  localStorage.setItem('ringX', ringX.toString());
  localStorage.setItem('ringY', ringY.toString());
}

// DOM elements
let ring;
let help;
let appWindow;
let licenseModal;

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", async () => {
  ring = document.getElementById("ring");
  help = document.getElementById("help");
  licenseModal = document.getElementById("license-modal");
  appWindow = getCurrentWindow();

  // Set window to fill screen (not fullscreen mode, just sized to screen)
  await appWindow.setSize({
    type: "Logical",
    width: window.screen.width,
    height: window.screen.height
  });
  await appWindow.setPosition({ type: "Logical", x: 0, y: 0 });

  // Apply initial size and position
  updateRingSize();
  updateRingPosition();

  // Setup click-through for non-ring areas
  setupClickThrough();

  // Setup drag to move ring
  setupDrag();

  // Setup keyboard controls
  setupKeyboard();

  // Setup scroll to resize
  setupScroll();

  // Setup licensing
  await setupLicensing();
});

function updateRingSize() {
  document.documentElement.style.setProperty("--ring-size", `${ringSize}px`);
  // ringThickness is kept for hit detection but SVG stroke-width scales automatically
}

function updateRingPosition() {
  // Simple 2D transform - avoid 3D transforms which can cause compositor artifacts on transparent windows
  ring.style.transform = `translate(${ringX - ringSize/2}px, ${ringY - ringSize/2}px)`;
}

// Click-through: ignore clicks on transparent areas, capture on ring
async function setupClickThrough() {
  let isIgnoring = true;
  appWindow.setIgnoreCursorEvents(true);

  // Poll global cursor position to toggle click-through
  // Uses native API that works even when window is ignoring events
  setInterval(async () => {
    try {
      const [x, y] = await invoke("get_cursor_position");
      const isOverRing = isPointOverRing(x, y);

      // Check UI elements at cursor position
      const elemAtPoint = document.elementFromPoint(x, y);
      const isOverUI = elemAtPoint && (elemAtPoint.closest('#help') || elemAtPoint.closest('#license-modal'));

      const shouldCapture = isOverRing || isOverUI;

      if (shouldCapture && isIgnoring) {
        appWindow.setIgnoreCursorEvents(false);
        isIgnoring = false;
      } else if (!shouldCapture && !isIgnoring) {
        appWindow.setIgnoreCursorEvents(true);
        isIgnoring = true;
      }
    } catch (err) {
      // Cursor position fetch failed
    }
  }, 16); // ~60fps polling
}

function isPointOverRing(x, y) {
  // Ring center is at (ringX, ringY)
  const dx = x - ringX;
  const dy = y - ringY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Ring is a donut shape: outer radius - inner radius
  const outerRadius = ringSize / 2;
  const innerRadius = outerRadius - ringThickness;

  // Add some padding for the glow
  const glowPadding = 30;

  return distance <= outerRadius + glowPadding && distance >= innerRadius - glowPadding;
}


function resize(delta) {
  ringSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, ringSize + delta));
  ringThickness = Math.max(10, Math.min(100, ringSize * 0.1));
  updateRingSize();
  updateRingPosition(); // Re-center after resize
  saveSize();
}

// Drag to move ring element
function setupDrag() {
  let isDragging = false;
  let startMouseX, startMouseY;
  let startRingX, startRingY;

  ring.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isDragging = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startRingX = ringX;
      startRingY = ringY;
      ring.style.cursor = "grabbing";
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      ringX = startRingX + dx;
      ringY = startRingY + dy;
      updateRingPosition();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      ring.style.cursor = "grab";
      savePosition();
    }
  });
}

// Scroll to resize
function setupScroll() {
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SIZE_STEP : SIZE_STEP;
    resize(delta);
  }, { passive: false });
}

// Keyboard controls
function setupKeyboard() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape":
        exit(0);
        break;

      case "+":
      case "=":
        resize(SIZE_STEP);
        break;

      case "-":
      case "_":
        resize(-SIZE_STEP);
        break;

      case "h":
      case "H":
        help.classList.toggle("hidden");
        break;

      case "l":
      case "L":
        showLicenseModal();
        break;

      case "ArrowUp":
        e.preventDefault();
        nudgeRing(0, -NUDGE_STEP);
        break;

      case "ArrowDown":
        e.preventDefault();
        nudgeRing(0, NUDGE_STEP);
        break;

      case "ArrowLeft":
        e.preventDefault();
        nudgeRing(-NUDGE_STEP, 0);
        break;

      case "ArrowRight":
        e.preventDefault();
        nudgeRing(NUDGE_STEP, 0);
        break;
    }
  });
}

function nudgeRing(dx, dy) {
  ringX += dx;
  ringY += dy;
  updateRingPosition();
  savePosition();
}

// Licensing
async function setupLicensing() {
  // Increment use count
  const [isLicensed, useCount, maxFree] = await invoke("increment_use_count");

  // Update status display
  updateLicenseStatus(isLicensed, useCount, maxFree);

  // Check if we should show nag
  if (!isLicensed && useCount >= maxFree) {
    showLicenseModal();
  }

  // Setup modal event handlers
  const enterLicenseBtn = document.getElementById("enter-license-btn");
  const activateBtn = document.getElementById("activate-btn");
  const cancelLicenseBtn = document.getElementById("cancel-license-btn");
  const closeNagBtn = document.getElementById("close-nag-btn");
  const licenseInputSection = document.getElementById("license-input-section");
  const licenseKeyInput = document.getElementById("license-key-input");
  const licenseError = document.getElementById("license-error");
  const modalActions = document.querySelector(".modal-actions");

  enterLicenseBtn.addEventListener("click", () => {
    modalActions.classList.add("hidden");
    licenseInputSection.classList.remove("hidden");
    licenseKeyInput.focus();
  });

  cancelLicenseBtn.addEventListener("click", () => {
    modalActions.classList.remove("hidden");
    licenseInputSection.classList.add("hidden");
    licenseKeyInput.value = "";
    licenseError.classList.add("hidden");
  });

  activateBtn.addEventListener("click", async () => {
    const key = licenseKeyInput.value.trim();
    if (!key) {
      showLicenseError("Please enter a license key");
      return;
    }

    try {
      const email = await invoke("activate_license", { licenseKey: key });
      hideLicenseModal();
      updateLicenseStatus(true, 0, 10);
      console.log("License activated for:", email);
    } catch (err) {
      showLicenseError(err);
    }
  });

  closeNagBtn.addEventListener("click", () => {
    hideLicenseModal();
  });

  function showLicenseError(message) {
    licenseError.textContent = message;
    licenseError.classList.remove("hidden");
  }
}

function showLicenseModal() {
  licenseModal.classList.remove("hidden");
}

function hideLicenseModal() {
  licenseModal.classList.add("hidden");
}

function updateLicenseStatus(isLicensed, useCount, maxFree) {
  const statusEl = document.getElementById("license-status");
  if (isLicensed) {
    statusEl.textContent = "Pro License Active";
    statusEl.className = "license-status pro";
  } else {
    const remaining = Math.max(0, maxFree - useCount);
    statusEl.textContent = `${remaining} free uses remaining`;
    statusEl.className = "license-status trial";
  }
}
